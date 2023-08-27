import Pagination from '@/pages/component/commons/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getCandidateFetch } from '@/redux-saga/slices/candidateSlices';
import { useEffect, useState } from 'react';
import { paginate } from '@/helper/paginate';
import CandidateModal from '@/pages/component/commons/CandidateModal';
import CandidateTable from '@/pages/component/commons/CandidateTable';

export default function Contract(props: any){
    const dispatch = useDispatch();
    const { candidates, isLoading } = useSelector((state: any) => state.candidates);
    const [reload, setReload] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<{userId: number; progId: number; username: string;}>({userId: 0, username: '', progId:0});
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(getCandidateFetch({status: props.status}));
        if(candidates) {
            setCurrentPage(candidates.page);
        }
        setReload(false);
    }, [candidates && Object.keys(candidates).length, reload]);

    const handleStatusChange = (userId: number, progId: number, username: string) => {
        setSelectedData({userId, progId, username});
        setIsOpen(true);
    }

    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };

    const paginatedData = candidates && paginate(candidates.data, currentPage, candidates.limit);
    
    if(isLoading) {
        return (<span>Loading...</span>);
    }
    
    return (
        <>
            {candidates && 
            <>
                <div className="relative overflow-x-auto border border-t-0">
                    <CandidateTable candidates={candidates} paginatedData={paginatedData} handleStatusChange={handleStatusChange}/>
                </div>
                <Pagination items={candidates.data.length} pageSize={candidates.limit} currentPage={currentPage} onPageChange={onPageChange}/>
                <CandidateModal isOpen={isOpen} setIsOpen={setIsOpen} candidate={selectedData} setReload={setReload} tabs={props.status}/>
            </>
            }
        </>
    )
}