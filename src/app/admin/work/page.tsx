import { hasRoleOrRedirectMain } from '@/lib/authGuard';
import React from 'react';

export default async function work() {
	hasRoleOrRedirectMain('admin');
	return <div>work</div>;
}
