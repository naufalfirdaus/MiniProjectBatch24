import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'output/entities/Users';
import { BusinessEntity } from 'output/entities/BusinessEntity';
import { UsersEmail } from 'output/entities/UsersEmail';
import { UsersEducation } from 'output/entities/UsersEducation';
import { UsersAddress } from 'output/entities/UsersAddress';
import { Address } from 'output/entities/Address';
import { AddressType } from 'output/entities/AddressType';
import { UsersPhones } from 'output/entities/UsersPhones';
import { UsersRoles } from 'output/entities/UsersRoles';
import { Roles } from 'output/entities/Roles';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { City } from 'output/entities/City';
import { UsersExperiences } from 'output/entities/UsersExperiences';
import { PhoneNumberType } from 'output/entities/PhoneNumberType';

const salt = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepo: Repository<Users>,
    @InjectRepository(BusinessEntity)
    private businessEntityRepository: Repository<BusinessEntity>,
    @InjectRepository(UsersEmail)
    private UsersEmailRepository: Repository<UsersEmail>,
    @InjectRepository(UsersPhones)
    private UsersPhonesRepository: Repository<UsersPhones>,
    @InjectRepository(PhoneNumberType)
    private PhoneNumberTypeRepository: Repository<PhoneNumberType>,
    @InjectRepository(UsersRoles)
    private UsersRolesRepository: Repository<UsersRoles>,
    @InjectRepository(Roles)
    private RolesRepository: Repository<Roles>,
    @InjectRepository(UsersEducation)
    private UsduRepository: Repository<UsersEducation>,
    @InjectRepository(UsersAddress)
    private UsersAddressRepository: Repository<UsersAddress>,
    @InjectRepository(Address)
    private AddressRepository: Repository<Address>,
    @InjectRepository(AddressType)
    private AddressTypeRepository: Repository<AddressType>,
    @InjectRepository(City)
    private CityRepository: Repository<City>,
    @InjectRepository(UsersEducation)
    private UsersEducationRepository: Repository<UsersEducation>,
    @InjectRepository(UsersExperiences)
    private UsersExperiencesRepository: Repository<UsersExperiences>,
    private jwtService: JwtService,
  ) {}

  //fungsi melihat semua data tabel users
  public async findAll() {
    return await this.userRepo.find({
      relations: {
        usersRoles: true,
      },
    });
  }

  // Tambahan untuk get semua roleName user = employee
  public async findAllEmployee() {
    return await this.userRepo.find({
      relations: {
        usersRoles: true,
      },
      where: {
        usersRoles: {
          usroRole: {
            roleName: 'Employee', // Ganti dengan nama peran "employee" yang sesuai di entitas Roles
          },
        },
      },
    });
  }

  // fungsi melihat satu data tabel users bedasarkan id
  // public async findOne(id: number) {
  //   return await this.userRepo.findOne({
  //     relations: {
  //       usersEmails: true,
  //       usersPhones: true,
  //     },
  //     where: {
  //       userEntityId: id,
  //       usersEmails: {
  //         pmailEntity: {
  //           userEntityId: id,
  //         },
  //       },
  //       usersPhones: {
  //         uspoEntity: {
  //           userEntityId: id,
  //         },
  //       },
  //     },
  //   });
  // }

  public async findOne(id: number) {
    return await this.userRepo
      .createQueryBuilder('user')
      .where('user.userEntityId = :id', { id })
      .leftJoinAndSelect('user.usersEmails', 'usersEmail')
      .leftJoinAndSelect('user.usersPhones', 'usersPhone')
      .getOne();
  }

  //fungsi signup users menjadi candidate atau talent berdasarkan apply yang dipilih
  public async signup(fields: any) {
    let businessEntity: BusinessEntity;
    try {
      const businessEntity = new BusinessEntity();
      const savedBusinessEntity = await this.businessEntityRepository.save(
        businessEntity,
      );
      const entity_id = savedBusinessEntity.entityId;
      const hashPassword = await bcrypt.hash(fields.password, salt);
      const confirmPassword = fields.confirmPassword;

      if (fields.password !== confirmPassword) {
        await this.businessEntityRepository.delete(entity_id);
        throw new Error('Password and confirm password do not match.');
      }

      let role;
      // penyesuain untuk form FE (value harus integer)
      if (fields.apply === 1) {
        role = await this.RolesRepository.findOne({
          where: { roleName: 'Candidat' },
        });
        if (!role) {
          await this.businessEntityRepository.delete(entity_id);
          throw new Error('Candidate role not found.');
        }
        // penyesuain untuk form FE (value harus integer)
      } else if (fields.apply === 2) {
        role = await this.RolesRepository.findOne({
          where: { roleName: 'Talent' },
        });
        if (!role) {
          await this.businessEntityRepository.delete(entity_id);
          throw new Error('Talent role not found.');
        }
      } else {
        await this.businessEntityRepository.delete(entity_id);
        throw new Error('Invalid role.');
      }

      // penyesuain untuk form FE
      let userPontyCode;
      if (fields.uspoPontyCode === 'Cell') {
        userPontyCode = await this.PhoneNumberTypeRepository.findOne({
          where: { pontyCode: 'Cell' },
        });
      } else if (fields.uspoPontyCode === 'Home') {
        userPontyCode = await this.PhoneNumberTypeRepository.findOne({
          where: { pontyCode: 'Home' },
        });
      } else {
        throw new Error('Invalid Type Phone Number');
      }

      const roleId = role.roleId;
      const user = await this.userRepo.save({
        userEntityId: entity_id,
        userFirstName: fields.userFirstName, // penyesuain untuk form FE
        userLastName: fields.userLastName, // penyesuain untuk form FE
        userName: fields.userName, // penyesuain untuk form FE
        userPassword: hashPassword,
        userCurrentRole: roleId,
        userModifiedDate: new Date(),
      });

      const userEmail = await this.UsersEmailRepository.save({
        pmailEntityId: entity_id,
        pmailAddress: fields.pmailAddress,
        pmailModifiedDate: new Date(),
      });

      const userPhone = await this.UsersPhonesRepository.save({
        uspoEntityId: entity_id,
        uspoNumber: fields.uspoNumber,
        uspoModifiedDate: new Date(),
        uspoPontyCode: userPontyCode, // penyesuain untuk form FE
      });

      const userRole = await this.UsersRolesRepository.save({
        usroEntityId: entity_id,
        usroRoleId: roleId,
        usroModifiedDate: new Date(),
      });
      return { user };
    } catch (error) {
      if (businessEntity) {
        await this.businessEntityRepository.delete({
          entityId: businessEntity.entityId,
        });
      }
      throw new Error(error.message);
    }
  }

  // SIGNUP EMPLOYEE
  public async signupasemployee(fields: any) {
    let businessEntity: BusinessEntity;
    try {
      const businessEntity = new BusinessEntity();
      const savedBusinessEntity = await this.businessEntityRepository.save(
        businessEntity,
      );
      const entity_id = savedBusinessEntity.entityId;
      let role;
      // penyesuain untuk form FE (value harus integer)
      if (fields.apply && fields.apply === 12) {
        role = await this.RolesRepository.findOne({
          where: { roleName: 'Employee' },
        });
      } else if (!role) {
        await this.businessEntityRepository.delete(entity_id);
        throw new Error('Employee role not found.');
      } else {
        await this.businessEntityRepository.delete(entity_id);
        throw new Error('Invalid role.');
      }
      // const role = await this.RolesRepository.findOne({
      //   where: { roleId: 12 },
      // });
      // if (!role) {
      //   await this.businessEntityRepository.delete(entity_id);
      //   throw new Error('Role not found.');
      // }

      // penyesuain untuk form FE
      let userPontyCode;
      if (fields.uspoPontyCode === 'Cell') {
        userPontyCode = await this.PhoneNumberTypeRepository.findOne({
          where: { pontyCode: 'Cell' },
        });
      } else if (fields.uspoPontyCode === 'Home') {
        userPontyCode = await this.PhoneNumberTypeRepository.findOne({
          where: { pontyCode: 'Home' },
        });
      } else {
        throw new Error('Invalid Type Phone Number');
      }

      const roleId = role.roleId;
      const hashPassword = await bcrypt.hash(fields.password, salt);
      const confirmPassword = fields.confirmPassword;

      if (fields.password !== confirmPassword) {
        await this.businessEntityRepository.delete(entity_id);
        throw new Error('Password and confirm password do not match.');
      }

      if (!fields.pmailAddress || !fields.pmailAddress.includes('@code.id')) {
        await this.businessEntityRepository.delete({
          entityId: businessEntity.entityId,
        });
        await this.userRepo.delete({ userEntityId: entity_id });
        throw new Error('Email must be a valid @code.id email for signup.');
      }

      const user = await this.userRepo.save({
        userEntityId: entity_id,
        userFirstName: fields.userFirstName, // penyesuain untuk form FE
        userLastName: fields.userLastName, // penyesuain untuk form FE
        userName: fields.userName, // penyesuain untuk form FE
        userPassword: hashPassword,
        userCurrentRole: roleId,
        userModifiedDate: new Date(),
      });

      // const user = await this.userRepo.save({
      //   userEntityId: entity_id,
      //   userName: fields.name,
      //   userPassword: hashPassword,
      //   userCurrentRole: roleId,
      //   userModifiedDate: new Date(),
      // });

      const userEmail = await this.UsersEmailRepository.save({
        pmailEntityId: entity_id,
        pmailAddress: fields.pmailAddress,
        pmailModifiedDate: new Date(),
      });

      const userPhone = await this.UsersPhonesRepository.save({
        uspoEntityId: entity_id,
        uspoNumber: fields.uspoNumber,
        uspoModifiedDate: new Date(),
        uspoPontyCode: userPontyCode, // penyesuain untuk form FE
      });

      const userRole = await this.UsersRolesRepository.save({
        usroEntityId: entity_id,
        usroRoleId: roleId,
        usroModifiedDate: new Date(),
      });

      return { user, userEmail, userPhone, userRole };
    } catch (error) {
      if (businessEntity) {
        await this.businessEntityRepository.delete({
          entityId: businessEntity.entityId,
        });
      }

      throw new Error(error.message);
    }
  }

  //fungsi apply
  public async applyupdate(file, id: number, fields: any) {
    try {
      const birthdate = new Date(fields.birthdate);

      if (isNaN(birthdate.getTime())) {
        throw new Error('Invalid birthdate format');
      }

      const user = await this.userRepo.update(id, {
        userName: fields.name,
        userFirstName: fields.firstname,
        userLastName: fields.lastname,
        userBirthDate: birthdate,
        userModifiedDate: new Date(),
        userPhoto: file.filename,
      });

      const education = await this.UsduRepository.save({
        usduEntityId: id,
        usduSchool: fields.school,
        usduDegree: fields.degree,
        usduFieldStudy: fields.study,
        usduModifiedDate: new Date(),
      });

      return { user, education };
    } catch (error) {
      throw new Error('Failed to update user data: ' + error.message);
    }
  }

  //fungsi delete berdasarkan entityid users
  public async delete(id: number) {
    await this.UsersPhonesRepository.delete({ uspoEntityId: id });
    await this.UsersEmailRepository.delete({ pmailEntityId: id });
    await this.UsersRolesRepository.delete({ usroEntityId: id });
    await this.UsduRepository.delete({ usduEntityId: id });
    await this.userRepo.delete({ userEntityId: id });

    await this.businessEntityRepository.delete({
      entityId: id,
    });
  }

  //fungsi validasi username dan password untuk signin
  public async validateUser(username: string, password: string) {
    const user = await this.userRepo.findOne({
      where: [
        { userName: username },
        { usersEmails: { pmailAddress: username } },
      ],
      relations: ['usersEmails'],
    });

    if (user) {
      const compare = await bcrypt.compare(password, user.userPassword);
      if (compare) {
        const { userPassword, ...result } = user;
        return result;
      }
    }

    return null;
  }

  //fungsi login untuk membuat token
  public async login(user: any) {
    const payload = {
      userid: user.userEntityId,
      username: user.userName,
      firstname: user.userFirstName,
      lastname: user.userLastName,
      email: user.pmailAddress,
      phone: user.uspoNumber,
      roleid: user.userCurrentRole,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  //fungsi editprofile users
  public async editprofile(file, id: number, fields: any) {
    try {
      const user = await this.userRepo.update(id, {
        userName: fields.name,
        userFirstName: fields.firstname,
        userLastName: fields.lastname,
        userPhoto: file.filename,
        userBirthDate: fields.birthdate,
        userModifiedDate: new Date(),
      });
      return { user };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //fungsi ubah password
  public async changepassword(id: number, fields: any) {
    try {
      const user = await this.userRepo.findOne({
        where: {
          userEntityId: id,
        },
      });
      if (!user) {
        throw new Error('User not found');
      }

      const isPasswordValid = await bcrypt.compare(
        fields.currentpassword,
        user.userPassword,
      );

      if (!isPasswordValid) {
        throw new Error('Invalid current password');
      }

      if (fields.newpassword !== fields.retypepassword) {
        throw new Error('New password and retype password do not match');
      }

      const hashedNewPassword = await bcrypt.hash(fields.newpassword, 10);

      const updatedUser = await this.userRepo.update(id, {
        userPassword: hashedNewPassword,
        userModifiedDate: new Date(),
      });

      return { user: updatedUser };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //fungsi add email
  public async addemail(id: number, fields: any) {
    try {
      const useremail = await this.UsersEmailRepository.save({
        pmailEntityId: id,
        pmailAddress: fields.email,
        pmailModifiedDate: new Date(),
      });
      return { useremail };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //fungsi edit email
  public async editmail(pmailid: number, fields: any) {
    try {
      const user = await this.UsersEmailRepository.findOne({
        where: {
          pmailId: pmailid,
        },
      });

      if (!user) {
        throw new Error('Email not found');
      }

      const useremail = await this.UsersEmailRepository.update(
        { pmailId: pmailid },
        {
          pmailAddress: fields.email,
          pmailModifiedDate: new Date(),
        },
      );

      return { useremail };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //fungsi delete email berdasarkan pmailid
  public async deleteemail(pmailid: number) {
    await this.UsersEmailRepository.delete({ pmailId: pmailid });
  }

  //fungsi tambah data phone
  public async addphone(id: number, fields: any) {
    try {
      const userphone = await this.UsersPhonesRepository.save({
        uspoEntityId: id,
        uspoNumber: fields.phone,
        uspoPontyCode: fields.PontyCode,
        uspoModifiedDate: new Date(),
      });
      return { userphone };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //fungsi editphone
  public async editphone(usponumber: string, fields: any) {
    try {
      const user = await this.UsersPhonesRepository.findOne({
        where: {
          uspoNumber: usponumber,
        },
      });

      if (!user) {
        throw new Error('Number not found');
      }

      const userphone = await this.UsersPhonesRepository.update(
        { uspoNumber: usponumber },
        {
          uspoNumber: fields.phone,
          uspoPontyCode: fields.type,
          uspoModifiedDate: new Date(),
        },
      );

      return { userphone };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //fungsi delete phone
  public async deletephone(usponumber: string) {
    await this.UsersPhonesRepository.delete({
      uspoNumber: usponumber,
    });
  }

  //fungsi add address
  public async addaddress(id: number, fields: any) {
    try {
      let cityname;
      switch (fields.city) {
        case 'Bandung':
        case 'Bogor':
        case 'Jakarta':
          cityname = fields.city;
          break;
        default:
          throw new Error('Invalid city.');
      }

      const city = await this.CityRepository.findOne({
        where: { cityName: cityname },
      });

      if (!city) {
        throw new Error(`City with name ${cityname} not found.`);
      }

      const cityId = city.cityId;

      const Address = await this.AddressRepository.save({
        addrLine1: fields.address1,
        addrLine2: fields.address2,
        addrPostalCode: fields.poscode,
        addrCity: { cityId },
        addrModifiedDate: new Date(),
      });

      const addrid = Address.addrId;

      let adtyName;
      switch (fields.type) {
        case 'Home':
        case 'Main Office':
        case 'Primary':
        case 'Shipping':
        case 'Billing':
        case 'Archive':
          adtyName = fields.type;
          break;
        default:
          throw new Error('Invalid adty.');
      }

      const adty = await this.AddressTypeRepository.findOne({
        where: { adtyName },
      });

      if (!adty) {
        throw new Error(`Address type ${adtyName} not found.`);
      }

      const adtyId = adty.adtyId;

      const userid = await this.userRepo.findOne({
        where: {
          userEntityId: id,
        },
      });

      if (!userid) {
        throw new Error(`User with ID ${id} not found.`);
      }

      const useraddress = await this.UsersAddressRepository.save({
        etadAddrId: addrid,
        etadEntity: userid,
        etadAdtyId: adtyId,
        etadModifiedDate: new Date(),
      });

      return { useraddress, Address };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // fungsi edit address
  public async editaddress(id: number, fields: any) {
    try {
      const address = await this.AddressRepository.findOne({
        where: {
          addrId: id,
        },
      });
      if (!address) {
        throw new Error('Address not found');
      }

      let cityname;
      switch (fields.city) {
        case 'Bandung':
        case 'Bogor':
        case 'Jakarta':
          cityname = fields.city;
          break;
        default:
          throw new Error('Invalid city.');
      }

      const city = await this.CityRepository.findOne({
        where: { cityName: cityname },
      });

      if (!city) {
        throw new Error(`City with name ${cityname} not found.`);
      }

      const cityId = city.cityId;

      let adtyName;
      switch (fields.type) {
        case 'Home':
        case 'Main Office':
        case 'Primary':
        case 'Shipping':
        case 'Billing':
        case 'Archive':
          adtyName = fields.type;
          break;
        default:
          throw new Error('Invalid adty.');
      }

      const adty = await this.AddressTypeRepository.findOne({
        where: { adtyName },
      });

      if (!adty) {
        throw new Error(`Address type ${adtyName} not found.`);
      }

      const adtyId = adty.adtyId;

      const useraddress = await this.AddressRepository.update(
        { addrId: id },
        {
          addrLine1: fields.address1,
          addrLine2: fields.address2,
          addrPostalCode: fields.poscode,
          addrCity: { cityId },
          addrModifiedDate: new Date(),
        },
      );

      const useraddressadty = await this.UsersAddressRepository.update(
        { etadAddrId: id },
        {
          // etadAdtyId: adtyId,
          etadModifiedDate: new Date(),
        },
      );

      return { useraddress, address, useraddressadty };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //fungsi delete Address
  public async deleteaddress(id: number) {
    await this.UsersAddressRepository.delete({
      etadAddrId: id,
    });
    await this.AddressRepository.delete({ addrId: id });
  }

  //fungsi add education
  public async addeducation(id: number, fields: any) {
    try {
      const user = await this.userRepo.findOne({
        where: {
          userEntityId: id,
        },
      });
      if (!user) {
        throw new Error(`User with ID ${id} not found.`);
      }

      let userdegree;
      if (fields.degree === 'Bachelor') {
        userdegree = 'Bachelor';
      } else if (fields.degree === 'Diploma') {
        userdegree = 'Diploma';
      } else {
        throw new Error('Invalid Degree not found.');
      }

      let startMonth;
      if (fields.start === 'Januari') {
        startMonth = 1;
      } else if (fields.start === 'Februari') {
        startMonth = 2;
      } else if (fields.start === 'Maret') {
        startMonth = 3;
      } else {
        throw new Error('Invalid month not found.');
      }

      const startYear = fields.startYear;

      if (isNaN(startMonth) || isNaN(startYear)) {
        throw new Error('Invalid month or year.');
      }

      const startDate = new Date(startYear, startMonth);
      const usduStartDate = startDate.toISOString().slice(0, 7);

      let endMonth;
      if (fields.end === 'Januari') {
        endMonth = 1;
      } else if (fields.end === 'Februari') {
        endMonth = 2;
      } else if (fields.end === 'Maret') {
        endMonth = 3;
      } else {
        throw new Error('Invalid month not found.');
      }

      const endYear = fields.endYear;

      if (isNaN(endMonth) || isNaN(endYear)) {
        throw new Error('Invalid month or year.');
      }

      const endDate = new Date(endYear, endMonth);
      const usduEndDate = endDate.toISOString().slice(0, 7);

      const usereducation = await this.UsersEducationRepository.save({
        usduEntityId: id,
        usduSchool: fields.school,
        usduDegree: userdegree,
        usduFieldStudy: fields.study,
        usduGrade: fields.grade,
        usduStartDate: usduStartDate,
        usduEndDate: usduEndDate,
        usduActivities: fields.activies,
        usduDescription: fields.description,
      });
      return { user, usereducation };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //fungsi edit  education
  public async editeducation(id: number, fields: any) {
    try {
      const user = await this.UsersEducationRepository.findOne({
        where: {
          usduId: id,
        },
      });
      if (!user) {
        throw new Error(`User with ID ${id} not found.`);
      }

      let userdegree;
      if (fields.degree === 'Bachelor') {
        userdegree = 'Bachelor';
      } else if (fields.degree === 'Diploma') {
        userdegree = 'Diploma';
      } else {
        throw new Error('Invalid Degree not found.');
      }

      let startMonth;
      if (fields.start === 'Januari') {
        startMonth = 1;
      } else if (fields.start === 'Februari') {
        startMonth = 2;
      } else if (fields.start === 'Maret') {
        startMonth = 3;
      } else {
        throw new Error('Invalid month not found.');
      }

      const startYear = fields.startYear;

      if (isNaN(startMonth) || isNaN(startYear)) {
        throw new Error('Invalid month or year.');
      }

      const startDate = new Date(startYear, startMonth);
      const usduStartDate = startDate.toISOString().slice(0, 7);

      let endMonth;
      if (fields.end === 'Januari') {
        endMonth = 1;
      } else if (fields.end === 'Februari') {
        endMonth = 2;
      } else if (fields.end === 'Maret') {
        endMonth = 3;
      } else {
        throw new Error('Invalid month not found.');
      }

      const endYear = fields.endYear;

      if (isNaN(endMonth) || isNaN(endYear)) {
        throw new Error('Invalid month or year.');
      }

      const endDate = new Date(endYear, endMonth);
      const usduEndDate = endDate.toISOString().slice(0, 7);

      const usereducation = await this.UsersEducationRepository.update(
        { usduId: id },
        {
          usduSchool: fields.school,
          usduDegree: userdegree,
          usduFieldStudy: fields.study,
          usduGrade: fields.grade,
          usduStartDate: usduStartDate,
          usduEndDate: usduEndDate,
          usduActivities: fields.activies,
          usduDescription: fields.description,
        },
      );
      return { user, usereducation };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //fungsi delete Education
  public async deleteeducation(id: number) {
    await this.UsersEducationRepository.delete({
      usduId: id,
    });
  }

  //fungsi add experience
  public async addexperience(id: number, fields: any) {
    try {
      const user = await this.userRepo.findOne({
        where: {
          userEntityId: id,
        },
      });

      if (!user) {
        throw new Error(`User with ID ${id} not found.`);
      }
      let cityname;
      switch (fields.city) {
        case 'Bandung':
        case 'Bogor':
        case 'Jakarta':
          cityname = fields.city;
          break;
        default:
          throw new Error('Invalid city.');
      }

      const city = await this.CityRepository.findOne({
        where: { cityName: cityname },
      });

      if (!city) {
        throw new Error(`City with name ${cityname} not found.`);
      }

      const cityId = city.cityId;

      let startMonth;
      if (fields.start === 'Januari') {
        startMonth = 1;
      } else if (fields.start === 'Februari') {
        startMonth = 2;
      } else if (fields.start === 'Maret') {
        startMonth = 3;
      } else {
        throw new Error('Invalid month not found.');
      }

      const startYear = fields.startyear;

      if (isNaN(startMonth) || isNaN(startYear)) {
        throw new Error('Invalid month or year.');
      }

      const startDate = new Date(startYear, startMonth);
      const usexStartDate = startDate.toISOString().slice(0, 7);

      let endMonth;
      if (fields.end === 'Januari') {
        endMonth = 1;
      } else if (fields.end === 'Februari') {
        endMonth = 2;
      } else if (fields.end === 'Maret') {
        endMonth = 3;
      } else {
        throw new Error('Invalid month not found.');
      }

      const endYear = fields.endyear;

      if (isNaN(endMonth) || isNaN(endYear)) {
        throw new Error('Invalid month or year.');
      }

      const endDate = new Date(endYear, endMonth);
      const usexEndDate = endDate.toISOString().slice(0, 7);

      let usexcurrent;
      if (fields.current === 'yes') {
        usexcurrent = 1;
      } else if (fields.current === 'no') {
        startMonth = 0;
      } else {
        throw new Error('Invalid user experience.');
      }

      let employeetype: string;
      switch (fields.emtype) {
        case 'fulltime':
        case 'freelance':
        case 'contract':
        case 'remote':
          employeetype = fields.emtype;
          break;
        default:
          throw new Error('Invalid Employee Type');
      }

      let experiencetype: string;
      switch (fields.extype) {
        case 'company':
        case 'certified':
        case 'voluntering':
        case 'organization':
        case 'reward':
          experiencetype = fields.extype;
          break;
        default:
          throw new Error('Invalid Experience Type');
      }

      const userexperiences = await this.UsersExperiencesRepository.save({
        usexEntityId: id,
        usexTitle: fields.tittle,
        usexProfileHeadline: fields.headline,
        usexCompanyName: fields.company,
        usexCityId: cityId,
        usexStartDate: usexStartDate,
        usexEndDate: usexEndDate,
        usexIndustry: fields.industry,
        usexEmploymentType: employeetype,
        usexDescription: fields.desc,
        usexExperienceType: experiencetype,
        usexIsCurrent: usexcurrent,
      });
      return { user, userexperiences };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //edit data experience
  public async editexperience(usexid: number, fields: any) {
    try {
      const user = await this.UsersExperiencesRepository.findOne({
        where: {
          usexId: usexid,
        },
      });

      if (!user) {
        throw new Error(`User with ID ${usexid} not found.`);
      }
      let cityname;
      switch (fields.city) {
        case 'Bandung':
        case 'Bogor':
        case 'Jakarta':
          cityname = fields.city;
          break;
        default:
          throw new Error('Invalid city.');
      }

      const city = await this.CityRepository.findOne({
        where: { cityName: cityname },
      });

      if (!city) {
        throw new Error(`City with name ${cityname} not found.`);
      }

      const cityId = city.cityId;

      let startMonth;
      if (fields.start === 'Januari') {
        startMonth = 1;
      } else if (fields.start === 'Februari') {
        startMonth = 2;
      } else if (fields.start === 'Maret') {
        startMonth = 3;
      } else {
        throw new Error('Invalid month not found.');
      }

      const startYear = fields.startyear;

      if (isNaN(startMonth) || isNaN(startYear)) {
        throw new Error('Invalid month or year.');
      }

      const startDate = new Date(startYear, startMonth);
      const usexStartDate = startDate.toISOString().slice(0, 7);

      let endMonth;
      if (fields.end === 'Januari') {
        endMonth = 1;
      } else if (fields.end === 'Februari') {
        endMonth = 2;
      } else if (fields.end === 'Maret') {
        endMonth = 3;
      } else {
        throw new Error('Invalid month not found.');
      }

      const endYear = fields.endyear;

      if (isNaN(endMonth) || isNaN(endYear)) {
        throw new Error('Invalid month or year.');
      }

      const endDate = new Date(endYear, endMonth);
      const usexEndDate = endDate.toISOString().slice(0, 7);

      let usexcurrent;
      if (fields.current === 'yes') {
        usexcurrent = 1;
      } else if (fields.current === 'no') {
        usexcurrent = 0;
      } else {
        throw new Error('Invalid user experience.');
      }

      let employeetype: string;
      switch (fields.emtype) {
        case 'fulltime':
        case 'freelance':
        case 'contract':
        case 'remote':
          employeetype = fields.emtype;
          break;
        default:
          throw new Error('Invalid Employee Type');
      }

      let experiencetype: string;
      switch (fields.extype) {
        case 'company':
        case 'certified':
        case 'voluntering':
        case 'organization':
        case 'reward':
          experiencetype = fields.extype;
          break;
        default:
          throw new Error('Invalid Experience Type');
      }

      const userexperiences = await this.UsersExperiencesRepository.update(
        { usexId: usexid },
        {
          usexTitle: fields.tittle,
          usexProfileHeadline: fields.headline,
          usexCompanyName: fields.company,
          usexCityId: cityId,
          usexStartDate: usexStartDate,
          usexEndDate: usexEndDate,
          usexIndustry: fields.industry,
          usexEmploymentType: employeetype,
          usexDescription: fields.desc,
          usexExperienceType: experiencetype,
          usexIsCurrent: usexcurrent,
        },
      );
      return { user, userexperiences };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //delete data experience
  public async deleteexperience(usexid: number) {
    await this.UsersExperiencesRepository.delete({
      usexId: usexid,
    });
  }
}
