import { LuUserPlus } from 'react-icons/lu';
import Button from '~/components/Button';
import AccountLayout from '~/components/Layout/AccountLayout';
import classNames from 'classnames/bind';
import styles from './Products.module.scss';
import { useEffect, useState } from 'react';
import * as requests from '~/utils/request';
import { getToastError } from '~/customs/toastMessage/toastMessage';
import ProductsTable from '../Components/Table/ProductsTable';
import Loading from '~/components/Loading';

const cx = classNames.bind(styles);
export default function Products() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const getAllProducts = async () => {
            const res = await requests.get(`/products`);
            if (res && res?.data) {
                setProducts(res.data);
                setIsLoading(false);
            } else {
                setIsLoading(false);
                getToastError(res?.message);
            }
        };
        getAllProducts();
    }, []);
    return (
        <AccountLayout isAdmin={true}>
            {isLoading ? (
                <Loading />
            ) : (
                <div className={cx('wrapper')}>
                    <div className={cx('header')}>Customers</div>
                    <div className={cx('create-btn')}>
                        <Button medium outline leftIcon={<LuUserPlus />}>
                            Create new
                        </Button>
                    </div>
                    <ProductsTable data={products} />
                </div>
            )}
        </AccountLayout>
    );
}
