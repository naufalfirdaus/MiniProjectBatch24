import { Nav } from './navbar';
import { CardProfile } from './cardProfile';
import { FooterComponent } from './footer';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';
import { getCookie } from 'cookies-next';

const ProfilePage = () => {
  const [dataProfile, setDataProfile] = useState({});
  const router = useRouter();
  useEffect(() => {
    const userToken = getCookie('access_token');
    if (typeof userToken === 'string') {
      const fetchData = async () => {
        const decodedData: any = jwt_decode(userToken);
        setDataProfile(decodedData);
      };
      console.log(fetchData());
    } else {
      router.push('/signin');
    }
  }, [router]);

  return (
    <>
      <Nav dataProfile={dataProfile} />
      <CardProfile dataProfile={dataProfile} />
      <FooterComponent />
    </>
  );
};

export default ProfilePage;
