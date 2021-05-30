if (!process.env.NODE_ENV) throw new Error('Cannot detect runtime environment type');

const apiConstants = {
    BASE_URL:
        process.env.NODE_ENV === 'development'
            ? `http://localhost:5000`
            : `https://jobtracker.club`,
    GOOGLE_REDIRECT_URI:
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:5000/api/auth/googlelogin'
            : 'https://jobtracker.club/api/auth/googlelogin',
};

export default apiConstants;
