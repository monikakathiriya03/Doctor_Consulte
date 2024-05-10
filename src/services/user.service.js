const User = require('../model/user.model');
module.exports = class UserServices{
   
    // Create New User
    async createUser(body){
        try{
        return await User.create(body);
        }catch(error){
            console.log(error);
            return error.message;
        }

    };

    // Get All Users
    // async getAllUser(body){
    //     try{
    //     return await User.find(body);
    //     }catch(error){
    //         console.log(error);
    //         return error.message;
    //     }
    // };

    async getAllUser(query) {
        try {
          // Pagination
          let pageNo = Number(query.pageNo || 1);
          let perPage = Number(query.perPage || 10);
          let skip = (pageNo - 1) * perPage;
    
          // Search with keyword
          let search =
            query.search && query.search !== ""
              ? [
                {
                  $match: {
                    $or: [
                      {
                        name: {
                          $regex: query.search.trim().replace(/\s+/g, " "),
                          $options: "i",
                        },
                      },
                    ]
                    }
                },
              ]
              : [];
        } catch (error) {
          console.log(error);
          return error;
        }
      }

    // get single user
    async getUser(body){
        try{
        return await User.findOne(body);
        }catch(error){
            console.log(error);
            return error.message;
        }
    };

    // Update User
    async updateUser(body){
        try{
        return await User.findOneAndUpdate(id, {$set: body}, {new: true});
        }catch(error){
            console.log(error);
            return error.message;
        }
    };

};