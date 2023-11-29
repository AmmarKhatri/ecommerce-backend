export const fetchUserPublicInfo = async (_, { input }, context) => {
    const { user_id } = input;
    try {
        const users = await context.db.query('Select u.role as role, ui.first_name as fname, ui.last_name as lname from users u left join user_info ui on ui.id = u.id where u.id = $1;', [user_id]);
        // user validity checked
        if (users.rows.length === 0) {
            return {
                status: 404,
                message: "User does not exist"
            };
        }
        // now send the user
        let user = users.rows[0];
        return {
            status: 200,
            message: "User fetched successfully",
            public_info: {
                role: user.role,
                first_name: user.fname,
                last_name: user.lname
            }
        };
    }
    catch (error) {
        console.error('Error registering user:', error);
        return {
            status: 500,
            message: 'Internal server error.',
        };
    }
};
