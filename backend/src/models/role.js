const mongoose = require('mongoose');

// Định nghĩa schema cho Role
const roleSchema = new mongoose.Schema({
    role_name: { 
        type: String, 
        required: true,
        unique: true, 
        trim: true    
    }
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
