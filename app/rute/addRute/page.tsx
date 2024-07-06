'use client';
import rute from "../../asset/rute.jpg";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import { addDoc, collection, query, where, getDocs, getDoc, doc } from "firebase/firestore";
import { firestore } from "../../../firebaseConfig";
import { useState, useEffect } from "react";


// type Stasiun = {
//   id_stasiun: string;
//   namaStasiun: string;
//   nomerPlatform: string;
// };
// type Kereta = {
//   id_kereta: string,
//   namaKereta: string,
//   kelas: string,
//   destinasi: string,
// }


const AddRute = () => {
  const router = useRouter();
  const [addData, setAddData] = useState({
    id_rute: "",
    namaKereta: "",
    berangkat: "",
    waktuBerangkat: "",
    waktuTiba: "",
    namaStasiunDestinasi: "",
  });

  const [keretaList, setKeretaList] = useState<string[]>([]);
  const [stasiunList, setStasiunList] = useState<string[]>([]);

  useEffect(() => {
    const fetchKeretaData = async () => {
      const querySnapshot = await getDocs(collection(firestore, "dataKereta"));
      const keretaData = querySnapshot.docs.map(doc => doc.data().namaKereta as string);
      setKeretaList(keretaData);
    };

    const fetchStasiunData = async () => {
      const querySnapshot = await getDocs(collection(firestore, "dataStasiun"));
      const stasiunData = querySnapshot.docs.map(doc => doc.data().namaStasiun as string);
      setStasiunList(stasiunData);
    };

    fetchKeretaData();
    fetchStasiunData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (addData.id_rute.trim() !== "" && addData.berangkat.trim() !== "" && addData.namaKereta.trim() !== "" && addData.waktuBerangkat.trim() !== "" && addData.waktuTiba.trim() !== "" && addData.namaStasiunDestinasi.trim() !== "") {
      try {
        // Cek apakah id_rute sudah ada di Firestore
        const q = query(collection(firestore, "dataRute"), where("id_rute", "==", addData.id_rute));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          alert("ID Rute sudah ada, silakan gunakan ID lain.");
        } else {
          const dataRef = collection(firestore, "dataRute");
          await addDoc(dataRef, addData);
          alert(`Data berhasil disimpan`);
          router.push("/rute");
        }
      } catch (error) {
        console.error("Error menambahkan dokumen:", error);
      }
    } else {
      alert("Silakan Lengkapi Inputan Data Rute.");
    }
  };

  return (
    <div
      className="h-[90.5vh] w-screen-10 bg-cover bg-center"
      style={{ backgroundImage: `url(${rute.src})` }}
    >
      <div className="flex items-center justify-center h-full">
        <div className="bg-[#eedef8] bg-opacity-75 backdrop-filter backdrop-blur-sm p-6 rounded shadow-md w-[500px]">
          <div className="flex flex-row items-center cursor-pointer" onClick={() => router.push('/rute')}>
            <FaArrowLeftLong/>
            <h1 className="font-bold ml-2">Kembali</h1>
          </div>
          <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <h3 className="font-bold text-xl mb-5">Input Rute</h3>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID Rute</label>
              <input 
                value={addData.id_rute}
                onChange={(e) =>
                  setAddData({ ...addData, id_rute: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                required 
              />
            </div>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kereta</label>
              <select
                value={addData.namaKereta}
                onChange={(e) =>
                  setAddData({ ...addData, namaKereta: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option value="">Pilih Kereta</option>
                {keretaList.map((kereta, index) => (
                  <option key={index} value={kereta}>{kereta}</option>
                ))}
              </select>
            </div>
            
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Berangkat Dari Stasiun</label>
              <select
                value={addData.berangkat}
                onChange={(e) =>
                  setAddData({ ...addData, berangkat: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option value="">Pilih Stasiun</option>
                {stasiunList.map((stasiun, index) => (
                  <option key={index} value={stasiun}>{stasiun}</option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Waktu Berangkat</label>
              <input 
                value={addData.waktuBerangkat}
                onChange={(e) =>
                  setAddData({ ...addData, waktuBerangkat: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                required 
              />
            </div>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Waktu Tiba</label>
              <input 
                value={addData.waktuTiba}
                onChange={(e) =>
                  setAddData({ ...addData, waktuTiba: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                required 
              />
            </div>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Stasiun Destinasi</label>
              <select
                value={addData.namaStasiunDestinasi}
                onChange={(e) =>
                  setAddData({ ...addData, namaStasiunDestinasi: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option value="">Pilih Stasiun</option>
                {stasiunList.map((stasiun, index) => (
                  <option key={index} value={stasiun}>{stasiun}</option>
                ))}
              </select>
            </div>
            <button 
              type="submit" 
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Simpan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRute;
