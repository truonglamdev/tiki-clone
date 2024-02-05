/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Button from '~/components/Button';
import Pagination from '~/components/Pagination';
import styles from '../StylesTable.module.scss';
import { FaRegSadCry } from 'react-icons/fa';

const cx = classNames.bind(styles);

function CustomersTable({ data }) {
    const itemsPerPage = 19;
    const [itemOffset, setItemOffset] = useState(0);

    const currentUsersDisplay = useMemo(() => {
        const endOffset = itemOffset + itemsPerPage;
        return data.slice(itemOffset, endOffset);
    }, [itemOffset, data]);
    const pageCount = Math.ceil(data.length / itemsPerPage);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    const handlePageClick = (e) => {
        const newOffset = (e.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
        scrollToTop();
    };

    return (
        <div className={cx('wrapper')}>
            {currentUsersDisplay.length > 0 ? (
                <>
                    <Table className={cx('table')}>
                        <Thead className={cx('table-thead')}>
                            <Tr className={cx('table-tr')}>
                                <Th>ID</Th>
                                <Th>Name</Th>
                                <Th>Email</Th>
                                <Th>Phone</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody className={cx('table-body')}>
                            {currentUsersDisplay.length > 0 &&
                                currentUsersDisplay.map((user) => (
                                    <Tr key={user._id}>
                                        <Td>{user._id}</Td>
                                        <Td>{user.name}</Td>
                                        <Td>{user.email}</Td>
                                        <Td>{user.phone ? user.phone : 'Not update'}</Td>
                                        <Td>
                                            <div className={cx('actions')}>
                                                <Button outline small>
                                                    Details
                                                </Button>
                                            </div>
                                        </Td>
                                    </Tr>
                                ))}
                        </Tbody>
                    </Table>
                    <div className={cx('pagination')}>
                        <Pagination onPageChange={handlePageClick} pageCount={pageCount} />
                    </div>
                </>
            ) : (
                <div className={cx('no-data')}>No Data {<FaRegSadCry />}</div>
            )}
        </div>
    );
}

CustomersTable.propTypes = {
    data: PropTypes.array.isRequired,
};

export default CustomersTable;
