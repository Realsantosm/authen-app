

const signUp = async (req, res, next) => {
    try {

    } catch(err) {
        console.error('Error during sign up:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = signUp