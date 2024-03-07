/* eslint-disable no-case-declarations */
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { MdOutlineCreateNewFolder } from 'react-icons/md';
import Modal from 'react-modal';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { Transition } from 'react-transition-group';
import Button from '~/components/Button';
import Dropdown from '~/components/Dropdown/Dropdown';
import AccountLayout from '~/components/Layout/AccountLayout';
import { getToastError, getToastSuccess, getToastWarning } from '~/customs/toastMessage/toastMessage';
import { getAllBrand } from '~/redux/actions/brandAction';
import { getAllCategory } from '~/redux/actions/categoryAction';
import { getAllColor } from '~/redux/actions/colorAction';
import * as request from '~/utils/request';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import styles from './DetailsProducts.module.scss';

const cx = classNames.bind(styles);
const customStylesModal = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '100',
        width: 'auto',
        backgroundColor: '#fff',
        padding: '0',
        minWidth: '250px',
        borderRadius: '8px',
        overflow: 'hidden',
    },
};
function DetailsProducts() {
    const validateFormSchema = Yup.object().shape({
        name: Yup.string().required('Product name is required'),
        price: Yup.string().required('Product price is required'),
    });

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({ resolver: yupResolver(validateFormSchema) });

    const dispatch = useDispatch();
    const [editorValue, setEditorValue] = useState('');
    const nodeRef = useRef();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [addType, setAddType] = useState('');
    const [valueInput, setValueInput] = useState('');
    const [color, setColor] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');

    // const [productData, setProductData] = useState({
    //     name: '',
    //     price: '',
    //     brand: '',
    //     category: '',
    //     description: '',
    //     color: '',
    //     size: '',
    // });

    const handleSubmitFormAdd = (e) => {
        e.preventDefault();
        if (valueInput.trim() === '') {
            return getToastWarning(`Please enter ${addType}`);
        }
        switch (addType) {
            case 'color': {
                handleAdd(addType, valueInput);
                break;
            }
            case 'brand': {
                handleAdd(addType, valueInput);
                break;
            }
            case 'category': {
                handleAdd(addType, valueInput);
                break;
            }
            default:
                getToastError('Invalid data');
        }
    };

    //add color brand or category
    const handleAdd = async (addType, data) => {
        if (!addType || !data) {
            getToastWarning(`Please enter ${addType} title`);
            return;
        }
        try {
            const res = await request.post(`/${addType}`, { title: data });
            if (res?.data) {
                getToastSuccess(res?.message);
                setIsOpenModal(false);
                setValueInput('');
            } else {
                getToastError(`Add ${addType} failed`);
            }
        } catch (e) {
            getToastError(`Add ${addType} failed`);
        }
    };

    const handleClickAddNewBtn = (type) => {
        setAddType(type);
        setIsOpenModal(true);
    };

    const handleChangeColor = (e) => {
        if (e.target.value !== '') {
            setColor(e.target.value);
        }
    };

    const handleCreateNewProduct = (data, e) => {
        if (!color) {
           getToastError('Please choose a color')
        }

        console.log(errors?.color);
        const { name, price, countInStock } = data;
        e.preventDefault();
        const formData = new FormData();
        formData.append(name);
        formData.append(price);
        formData.append(countInStock);
    };

    useEffect(() => {
        dispatch(getAllColor());
        dispatch(getAllBrand());
        dispatch(getAllCategory());
    }, []);

    const colors = useSelector((state) => state.color.colors);
    const brands = useSelector((state) => state.brand.brands);
    const categories = useSelector((state) => state.category.categories);

    return (
        <AccountLayout isAdmin={true}>
            <form className={cx('wrapper')} onSubmit={handleSubmit(handleCreateNewProduct)}>
                <div className={cx('header')}>Details products</div>
                <div className={cx('container')}>
                    <div className={cx('actions')}>
                        <Button
                            outline
                            className={cx('action-btn')}
                            medium
                            rightIcon={<MdOutlineCreateNewFolder />}
                            onClick={() => handleClickAddNewBtn('brand')}
                        >
                            Add brand
                        </Button>
                        <Button
                            outline
                            className={cx('action-btn')}
                            medium
                            rightIcon={<MdOutlineCreateNewFolder />}
                            onClick={() => handleClickAddNewBtn('color')}
                        >
                            Add color
                        </Button>
                        <Button
                            outline
                            className={cx('action-btn')}
                            medium
                            rightIcon={<MdOutlineCreateNewFolder />}
                            onClick={() => handleClickAddNewBtn('category')}
                        >
                            Add category
                        </Button>
                    </div>
                    <div className={cx('group-field')}>
                        <div className={cx('filed')}>
                            <label className={cx('title')}>Name</label>
                            <input className={cx('input')} type="text" name="name" {...register('name')} />
                            <span className={cx('error-mes')}>{errors?.name?.message}</span>
                        </div>

                        <div className={cx('filed')}>
                            <label className={cx('title')}>Price</label>
                            <input className={cx('input')} type="text" {...register('price')} />
                            <span className={cx('error-mes')}>{errors?.price?.message}</span>
                        </div>
                        <div className={cx('filed')}>
                            <label className={cx('title')}>Count In Stock</label>
                            <input className={cx('input')} type="text" {...register('countInStock')} />
                            <span className={cx('error-mes')}>{errors?.countInStock?.message}</span>
                        </div>
                        <div className={cx('filed')}>
                            <label className={cx('title')}>Description</label>
                            <input className={cx('input')} type="text" />
                            <span className={cx('error-mes')}>Name is required</span>
                        </div>
                    </div>
                    <div className={cx('group-field')}>
                        <div className={cx('filed')}>
                            <label className={cx('title')}>Coupon</label>
                            <input className={cx('input')} type="text" />
                        </div>
                        <div className={cx('filed')}>
                            <label className={cx('title')}>Category</label>
                            <Dropdown
                                data={categories?.length > 0 ? categories : []}
                                onChange={handleChangeColor}
                                title="category"
                                register={register}
                                name="color"
                            />
                        </div>
                        <div className={cx('filed')}>
                            <label className={cx('title')}>Brand</label>
                            <Dropdown
                                data={brands.length > 0 ? brands : []}
                                onChange={handleChangeColor}
                                title="brand"
                            />
                        </div>
                        <div className={cx('filed')}>
                            <label className={cx('title')}>Color</label>
                            <Dropdown data={colors.length > 0 ? colors : []} onChange={handleChangeColor} />
                            <span className={cx('error-mes')}>{errors?.color?.message}</span>
                        </div>
                    </div>
                    <div className={cx('image-box')}>
                        <label className={cx('title')}>Images product</label>
                        <input hidden type="file" id="upload-img" />
                        <label className={cx('upload-btn')} htmlFor="upload-img">
                            Upload images
                        </label>
                    </div>
                    <div className={cx('text-editor')}>
                        <label className={cx('title')}>Description product</label>
                        <ReactQuill className={cx('editor')} value={editorValue} onChange={setEditorValue} />
                    </div>
                </div>
                <div className={cx('footer')}>
                    <Button primary medium type="submit">
                        Update
                    </Button>
                </div>
            </form>
            <Transition nodeRef={nodeRef.current} in={isOpenModal} timeout={200} classNames="modal">
                <Modal ref={nodeRef} isOpen={isOpenModal} style={customStylesModal} closeTimeoutMS={200}>
                    <div className={cx('model-wrapper')}>
                        <div className={cx('modal-header')}>
                            <span>Add {addType}</span>
                            <IoIosClose onClick={() => setIsOpenModal(false)} />
                        </div>
                        <div className={cx('model-content')}>
                            <form className={cx('form-data')} onSubmit={handleSubmitFormAdd}>
                                <label className={cx('title')}>{``}</label>
                                <input
                                    type="text"
                                    className={cx('input')}
                                    onChange={(e) => setValueInput(e.target.value)}
                                />
                                <Button medium className={cx('add-btn')}>
                                    Submit
                                </Button>
                            </form>
                        </div>
                    </div>
                </Modal>
            </Transition>
        </AccountLayout>
    );
}

export default DetailsProducts;
