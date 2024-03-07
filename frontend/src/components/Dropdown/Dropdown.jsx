import classNames from 'classnames/bind';
import styles from './Dropdown.module.scss';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);
function Dropdown({ data = [], title, onChange }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('custom-select')}>
                <select onChange={onChange}>
                    <option value="" defaultValue disabled="disabled">
                        {`Select ${title ? title : 'menu'}`}{' '}
                    </option>
                    {data.map((item) => (
                        <option value={item?._id} key={item._id}>
                            {item?.title}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

Dropdown.propTypes = {
    data: PropTypes.array.isRequired,
    title: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

export default Dropdown;
