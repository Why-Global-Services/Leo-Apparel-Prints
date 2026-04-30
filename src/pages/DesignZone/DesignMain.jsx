// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button, message } from "antd";
// import { FaPlus } from "react-icons/fa";
// import DesignTable from "./DesignTable";
// import { deleteDesignZone, getDesignZones } from "../../services/DesignZone";

// const DesignMain = () => {
//   const [zones, setZones] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
// console.log("triggered        digitallll");

//   useEffect(() => {
//     loadZones();
//   }, []);

//   const loadZones = async () => {
//     setLoading(true);
//     try {
//       const response = await getDesignZones();
//       setZones(response.data || []);
//     } catch (error) {
//       console.error("Failed to load design zones", error);
//       message.error("Unable to load design zones.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAdd = () => {
//     navigate("/designzone/add");
//   };

//   const handleEdit = (id) => {
//     navigate(`/designzone/edit/${id}`);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteDesignZone(id);
//       message.success("Design zone deleted successfully");
//       loadZones();
//     } catch (error) {
//       console.error("Failed to delete design zone", error);
//       message.error("Failed to delete design zone.");
//     }
//   };

//   return (
//     <div className="p-4 w-full bg-gray-100">
//       <div className="bg-white min-h-[calc(100vh-100px)] p-6 shadow-md rounded-md">
//         <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
//           <div>
//             <h2 className="text-2xl font-semibold text-gray-800">
//               Design Zone Management
//             </h2>
//             <p className="text-sm text-gray-500 mt-1">
//               Add and manage design zones, mesh names, and allowed fields.
//             </p>
//           </div>
//           <Button type="primary" icon={<FaPlus />} onClick={handleAdd}>
//             Add Design Zone
//           </Button>
//         </div>

//         <DesignTable
//           zones={zones}
//           loading={loading}
//           onEdit={handleEdit}
//           onDelete={handleDelete}
//         />
//       </div>
//     </div>
//   );
// };

// export default DesignMain;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, message } from "antd";
import { FaPlus } from "react-icons/fa";
import DesignTable from "./DesignTable";
import { deleteDesignZone, getDesignZones } from "../../services/DesignZone";

const DesignMain = () => {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadZones();
  }, []);

  const loadZones = async () => {
    setLoading(true);
    try {
      const response = await getDesignZones();
      setZones(response.data || []);
    } catch (error) {
      console.error("Failed to load design zones", error);
      message.error("Unable to load design zones.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    navigate("/designzone/add");
  };

  const handleEdit = (id) => {
    navigate(`/designzone/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDesignZone(id);
      message.success("Design zone deleted successfully");
      loadZones();
    } catch (error) {
      console.error("Failed to delete design zone", error);
      message.error("Failed to delete design zone.");
    }
  };

  return (
    <div className="p-6 w-full bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-blue to-primary-blue-dark bg-clip-text text-transparent">
              Design Zone Management
            </h2>
            <p className="text-gray-500 mt-1 flex items-center gap-1">
              <span className="inline-block w-1 h-1 rounded-full bg-primary-blue"></span>
              Add and manage design zones, mesh names, and allowed fields
            </p>
          </div>
          <Button
            type="primary"
            icon={<FaPlus />}
            onClick={handleAdd}
            className="!bg-primary-blue !border-primary-blue hover:!bg-primary-blue-dark hover:!shadow-lg transition-all duration-300 !h-10 !px-6 !rounded-xl !font-semibold"
          >
            Add Design Zone
          </Button>
        </div>

        <DesignTable
          zones={zones}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default DesignMain;