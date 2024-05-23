import { useState } from 'react';

type useFetchRes<T> = {
	action: () => void;
	value: T | null;
	loading: boolean;
	error: any;
};

type useFetchProps<T> = {
	promise: () => Promise<T>;
	defaultValue?: T;
	options?: {};
};

export const useFetch = <T>({
	defaultValue,
	promise,
}: useFetchProps<T>): useFetchRes<T> => {
	const [value, setValue] = useState<T | null>(defaultValue || null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<any>();

	const action = async () => {
		setLoading(true);
		promise()
			.then(data => {
				setValue(data);
			})
			.catch(e => {
				setError(JSON.stringify(e));
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return {
		action,
		error,
		loading,
		value,
	};
};
