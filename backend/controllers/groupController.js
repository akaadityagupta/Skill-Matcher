const EmployeeGroup = require('../models/EmployeeGroup');

// Create a new group
exports.createGroup = async (req, res) => {
  try {
    const { name, members } = req.body;
    
    if (!name || !members || members.length === 0) {
      return res.status(400).json({ message: 'Group name and at least one member are required' });
    }

    const group = new EmployeeGroup({
      name,
      members
    });

    await group.save();
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ message: 'Error creating group', error: error.message });
  }
};

// Get all groups
exports.getAllGroups = async (req, res) => {
  try {
    const groups = await EmployeeGroup.find().populate('members', 'name skills');
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching groups', error: error.message });
  }
};

// Get a single group
exports.getGroup = async (req, res) => {
  try {
    const group = await EmployeeGroup.findById(req.params.id).populate('members', 'name skills');
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    res.json(group);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching group', error: error.message });
  }
};

// Update a group
exports.updateGroup = async (req, res) => {
  try {
    const { name, members } = req.body;
    const group = await EmployeeGroup.findByIdAndUpdate(
      req.params.id,
      { name, members },
      { new: true }
    ).populate('members', 'name skills');

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    res.json(group);
  } catch (error) {
    res.status(500).json({ message: 'Error updating group', error: error.message });
  }
};

// Delete a group
exports.deleteGroup = async (req, res) => {
  try {
    const group = await EmployeeGroup.findByIdAndDelete(req.params.id);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    res.json({ message: 'Group deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting group', error: error.message });
  }
}; 