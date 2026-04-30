// import React from "react";
// import { Button, Tag } from "antd";
// import { FaEdit, FaTrash } from "react-icons/fa";

// const DesignTable = ({ zones, loading, onEdit, onDelete }) => {
//   return (
//     <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
//               S.No
//             </th>
//             <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
//               Zone Name
//             </th>
//             <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
//               Zone Key
//             </th>
//             <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
//               Status
//             </th>
//             <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-200 bg-white">
//           {zones.length === 0 && !loading ? (
//             <tr>
//               <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
//                 No design zones found. Create one to get started.
//               </td>
//             </tr>
//           ) : (
//             zones.map((zone, index) => (
//               <tr key={zone.id} className="hover:bg-gray-50 transition-colors">
//                 <td className="px-4 py-4 text-sm text-gray-700">{index + 1}</td>
//                 <td className="px-4 py-4 text-sm font-medium text-gray-900">
//                   {zone.zoneName}
//                 </td>
//                 <td className="px-4 py-4 text-sm text-gray-700">{zone.zoneKey}</td>
//                 <td className="px-4 py-4 text-sm">
//                   <Tag color={zone.isActive ? "green" : "red"}>
//                     {zone.isActive ? "Active" : "Inactive"}
//                   </Tag>
//                 </td>
//                 <td className="px-4 py-4 text-sm">
//                   <div className="flex gap-2">
//                     <Button
//                       type="default"
//                       icon={<FaEdit />}
//                       onClick={() => onEdit(zone.id)}
//                       size="small"
//                     >
//                       Edit
//                     </Button>
//                     <Button
//                       type="primary"
//                       danger
//                       icon={<FaTrash />}
//                       onClick={() => {
//                         if (window.confirm(`Delete zone "${zone.zoneName}"?`)) {
//                           onDelete(zone.id);
//                         }
//                       }}
//                       size="small"
//                     >
//                       Delete
//                     </Button>
//                   </div>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DesignTable;


import React from "react";
import { Button, Tag, Skeleton } from "antd";
import { FaEdit, FaTrash, FaPalette } from "react-icons/fa";

const DesignTable = ({ zones, loading, onEdit, onDelete }) => {
  if (loading) {
    return (
      <div className="space-y-3">
        <Skeleton active paragraph={{ rows: 5 }} />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-primary-blue/5 to-transparent">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              #
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              Zone Name
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              Zone Key
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              Status
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {zones.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center">
                <div className="flex flex-col items-center gap-3">
                  <FaPalette className="text-4xl text-gray-300" />
                  <p className="text-gray-400 font-medium">No design zones yet</p>
                  <p className="text-sm text-gray-400">Click "Add Design Zone" to create one</p>
                </div>
              </td>
            </tr>
          ) : (
            zones.map((zone, index) => (
              <tr
                key={zone.id}
                className="group hover:bg-gradient-to-r hover:from-primary-blue/5 hover:to-transparent transition-all duration-200"
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-500">
                  {index + 1}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary-blue"></div>
                    <span className="font-semibold text-gray-800">
                      {zone.zoneName}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <code className="px-2 py-1 bg-gray-100 rounded-md text-xs font-mono text-primary-blue">
                    {zone.zoneKey}
                  </code>
                </td>
                <td className="px-6 py-4">
                  <Tag
                    color={zone.isActive ? "success" : "error"}
                    className="!rounded-full !px-3 !py-0.5 !text-xs !font-medium"
                  >
                    {zone.isActive ? "Active" : "Inactive"}
                  </Tag>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Button
                      type="default"
                      icon={<FaEdit />}
                      onClick={() => onEdit(zone.id)}
                      size="middle"
                      className="!border-primary-blue/30 !text-primary-blue hover:!bg-primary-blue hover:!text-white !transition-all !duration-200 !rounded-lg"
                    >
                      Edit
                    </Button>
                    <Button
                      danger
                      icon={<FaTrash />}
                      onClick={() => {
                        if (window.confirm(`Delete zone "${zone.zoneName}"?`)) {
                          onDelete(zone.id);
                        }
                      }}
                      size="middle"
                      className="!border-red-200 hover:!border-red-400 !transition-all !duration-200 !rounded-lg"
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DesignTable;