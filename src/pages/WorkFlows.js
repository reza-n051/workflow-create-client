import React from 'react';
import API from '../api/api';
import WFList from '../components/WFList';
import useGetListApi from '../api/useGetList';
import Body from '../layouts/Body';

export default function Workflows() {

    const [{ data, isLoading, isError }, setIsDeleted] = useGetListApi();

    async function deleteWF(id) {
        const res = window.confirm('ایا مطمئنید که می خواهید این گردش کار را حذف کنید ؟');
        if (!res) {
            return;
        }
        try {
            const result = await API.delete(`api/Workflows/Delete/${id}`);
            if (result) {
                setIsDeleted((isDeleted) => !isDeleted);
                window.alert('ok workflow deleted successful');
            }
        } catch (err) {
            console.log(err);
            window.alert('something is wrong');
        }
    }

    return (

        <Body>
            {(isError || isError === undefined) && <p>something is wrong ...</p>}
            {
                (isLoading || isError === undefined) ?
                    (<p>loading</p>)
                    :
                    (<WFList workflows={data} deleteWF={deleteWF} />)
            }
        </Body>
    );
}
