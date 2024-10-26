const Dancer = require('../models/dancer');
const DanceClass = require('../models/danceClass');

const resolvers = {
    Query: {
        // Fetch all dancers
        dancers: async () => {
            try {
                return await Dancer.find();
            } catch (error) {
                console.error('Error fetching dancers:', error);
                throw new Error('Failed to fetch dancers');
            }
        },

        // Fetch a single dancer by ID
        dancer: async (_, { id }) => {
            try {
                const dancer = await Dancer.findById(id);
                if (!dancer) {
                    throw new Error('Dancer not found');
                }
                return dancer;
            } catch (error) {
                console.error('Error fetching dancer by ID:', error);
                throw new Error('Failed to fetch dancer');
            }
        },

        // Fetch all dance classes
        danceClasses: async () => {
            try {
                return await DanceClass.find();
            } catch (error) {
                console.error('Error fetching dance classes:', error);
                throw new Error('Failed to fetch dance classes');
            }
        },

        // Fetch a single dance class by ID
        danceClass: async (_, { id }) => {
            try {
                const danceClass = await DanceClass.findById(id);
                if (!danceClass) {
                    throw new Error('Dance class not found');
                }
                return danceClass;
            } catch (error) {
                console.error('Error fetching dance class by ID:', error);
                throw new Error('Failed to fetch dance class');
            }
        },
    },

    Mutation: {
        // Add a new dancer
        addDancer: async (_, { dancer }) => {
            try {
                const newDancer = new Dancer(dancer);
                return await newDancer.save();
            } catch (error) {
                console.error('Error adding dancer:', error);
                throw new Error('Failed to add dancer');
            }
        },

        // Update an existing dancer by ID
        updateDancer: async (_, { id, dancer }) => {
            try {
                const updatedDancer = await Dancer.findByIdAndUpdate(id, dancer, { new: true });
                if (!updatedDancer) {
                    throw new Error('Dancer not found');
                }
                return updatedDancer;
            } catch (error) {
                console.error('Error updating dancer:', error);
                throw new Error('Failed to update dancer');
            }
        },

        // Delete a dancer by ID
        deleteDancer: async (_, { id }) => {
            try {
                const result = await Dancer.findByIdAndDelete(id);
                if (!result) {
                    throw new Error('Dancer not found');
                }
                return true;
            } catch (error) {
                console.error('Error deleting dancer:', error);
                throw new Error('Failed to delete dancer');
            }
        },

        // Add a new dance class
        addDanceClass: async (_, { danceClass }) => {
            try {
                const newDanceClass = new DanceClass(danceClass);
                return await newDanceClass.save();
            } catch (error) {
                console.error('Error adding dance class:', error);
                throw new Error('Failed to add dance class');
            }
        },

        // Update an existing dance class by ID
        updateDanceClass: async (_, { id, danceClass }) => {
            try {
                const updatedDanceClass = await DanceClass.findByIdAndUpdate(id, danceClass, { new: true });
                if (!updatedDanceClass) {
                    throw new Error('Dance class not found');
                }
                return updatedDanceClass;
            } catch (error) {
                console.error('Error updating dance class:', error);
                throw new Error('Failed to update dance class');
            }
        },

        // Delete a dance class by ID
        deleteDanceClass: async (_, { id }) => {
            try {
                const result = await DanceClass.findByIdAndDelete(id);
                if (!result) {
                    throw new Error('Dance class not found');
                }
                return true;
            } catch (error) {
                console.error('Error deleting dance class:', error);
                throw new Error('Failed to delete dance class');
            }
        }
    }
};

module.exports = resolvers;





