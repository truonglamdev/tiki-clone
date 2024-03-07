import classNames from 'classnames/bind';
import propTypes from 'prop-types';
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from 'react-icons/tb';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

const cx = classNames.bind(styles);
function Pagination({ onPageChange, pageCount, pageRangeDisplay = 10 }) {
    return (
        <ReactPaginate
            nextLabel={<TbPlayerTrackNextFilled />}
            pageRangeDisplayed={pageRangeDisplay}
            pageCount={pageCount}
            previousLabel={<TbPlayerTrackPrevFilled />}
            renderOnZeroPageCount={null}
            onPageChange={onPageChange}
            className={cx('paginate')}
            containerClassName={cx('container-paginate')}
            activeClassName={cx('active-page')}
            pageClassName={cx('page')}
            breakClassName={cx('break-label')}
            breakLabel="..."
            nextClassName={cx('next-btn')}
            previousClassName={cx('prev-btn')}
        />
    );
}

Pagination.propTypes = {
    onPageChange: propTypes.func.isRequired,
    pageCount: propTypes.number,
    pageRangeDisplay: propTypes.number,
};

export default Pagination;
