import React, { useState } from 'react';
import AddEmployee from './AddEmployee';
import AllEmployees from './AllEmployees';
import AddProject from './AddProject';
import AllProjects from './AllProjects';
import FindEmployee from './FindEmployee';

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState('AddEmployee');

  const renderComponent = () => {
    const components = {
      AddEmployee: <AddEmployee />,
      AllEmployees: <AllEmployees />,
      AddProject: <AddProject />,
      AllProjects: <AllProjects />,
      FindEmployee: <FindEmployee />
    };
    return components[activeComponent] || <AddEmployee />;
  };

  const menuItems = [
    { id: 'AddEmployee', label: 'Add Employee', icon: '👤', color: 'from-blue-500 to-blue-600' },
    { id: 'AddProject', label: 'Add Project', icon: '📋', color: 'from-purple-500 to-purple-600' },
    { id: 'AllEmployees', label: 'All Employees', icon: '👥', color: 'from-green-500 to-green-600' },
    { id: 'AllProjects', label: 'All Projects', icon: '📊', color: 'from-orange-500 to-orange-600' },
    { id: 'FindEmployee', label: 'Find Employee', icon: '🔍', color: 'from-pink-500 to-pink-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-72 bg-white shadow-xl">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-xl font-bold">
                ES
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Employee Skill</h2>
            </div>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveComponent(item.id)}
                    className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                      activeComponent === item.id
                        ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 min-h-full animate-fade-in">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                  {menuItems.find(item => item.id === activeComponent)?.label}
                </h1>
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-100 px-4 py-2 rounded-lg">
                    <span className="text-gray-600">Welcome,</span>
                    <span className="font-semibold ml-2">Admin</span>
                  </div>
                </div>
              </div>
              {renderComponent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
