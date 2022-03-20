// @ts-check

let users = [

    {
        name: 'Jane Doe',
        email: 'janedoe@gmail.com',
        id: Date.now().toString() +1
    },
    {
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        id: Date.now().toString()
    },
]


/**
 * @param {any} _root
 * @param {{ email: any; name: string; }} args
 * @param {any} _context
 */
function createUser(_root, args, _context) {
    let email;
    let name;

    if(args && args.email && args.name) {
        email = args.email
        name = args.name
        const id = Date.now().toString()

        const userExists = users.find(user => user.email === email)

        if(userExists) {
            throw new Error('Cannot have 2 users with the same email')
        }

        const user = { email, name, id }

        users.unshift(user)

        return user
    } else {
        throw new Error('Bad user input. Expected email and name')
    }
}

/**
 * @param {any} _root
 * @param {{ id: string; user: { email: string; name: string; }; }} args
 * @param {any} _context
 */
function updateUser(_root, args, _context) {
    if(!args.id) {
        throw new Error('Must provide an id while updating')
    }

    const userIndex = users.findIndex(user => user.id === args.id)

    if(userIndex < 0) {
        throw new Error('the user you\'re trying to update doesn\'t exist')
    }

    if(!args.user) {
        throw new Error('You must provide a user as a second argument')
    }

    if(!args.user.email && !args.user.name) {
        throw new Error('You must provide at least 1 property to update - name or email')
    }


    const userToUpdate = users[userIndex]

    users = users.filter(user => {
        return user.id !== userToUpdate.id
    })

    if(args.user.email) {
        const exists = users.find(user => user.email === args.user.email)

        if(exists) {
          users.unshift(userToUpdate)
            throw new Error('You cannot change to an email that belongs to another account')
        }
    }

    const update = { ...userToUpdate }

    if(args.user.email) {
        update.email = args.user.email
    }

    if(args.user.name) {
        update.name = args.user.name
    }


    users.unshift(update)

    return update
}

/**
 * @param {any} _
 * @param {{ id: string; }} args
 * @param {any} __
 */
function deleteUser(_, args, __) {
    users = users.filter(user => user.id !== args.id)

    return { message: 'Delete operation completed'}
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUsers: ()  => users
}