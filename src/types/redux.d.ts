type ReduxState<T> = {
    data: T;
    error: string | undefined;
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
};
