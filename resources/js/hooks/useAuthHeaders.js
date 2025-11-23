import { usePage } from '@inertiajs/react';

export default function useAuthHeaders() {
    const { props } = usePage();
    return props.auth_token ? { Authorization: `Bearer ${props.auth_token}` } : {};
}
