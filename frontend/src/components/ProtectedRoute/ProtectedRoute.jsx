import PropType from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
const ROLES = ['admin', 'user'];

function ProtectedRoute({ roles = ROLES, redirectTo = '/login', children }) {
    const { user } = useSelector((state) => state.auth);
    // if (isLoading) return <div>Loading user</div>;
    const roleUser = user?.isAdmin ? 'admin' : 'user';
    const userHasRequiredRole = user && roles.includes(roleUser) ? true : false;
    if (!user) {
        return <Navigate to={redirectTo} />;
    }
    if (user && !userHasRequiredRole) {
        return <div>Role not access</div>;
    }
    return children ? children : <Outlet />;
}
ProtectedRoute.propTypes = {
    roles: PropType.array,
    redirectTo: PropType.string,
    children: PropType.node,
};

export default ProtectedRoute;
