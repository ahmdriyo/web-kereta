'use client';
import kereta from "../../asset/kereta.jpg";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../../../firebaseConfig";
type Station = {
  id_stasiun: string;
  namaStasiun: string;
  nomerPlatform: string;
};

const AddKereta = () => {
  const router = useRouter();
  const [addData, setAddData] = useState({
    id_kereta: "",
    namaKereta: "",
    kelas: "",
    destinasi: "",
  });
  const [stations, setStations] = useState<Station[]>([]);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const q = query(collection(firestore, "dataStasiun"));
        const querySnapshot = await getDocs(q);
        const stationList: Station[] = querySnapshot.docs.map(doc => doc.data() as Station);
        setStations(stationList);
      } catch (error) {
        console.error("Error fetching stations: ", error);
      }
    };

    fetchStations();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (addData.id_kereta.trim() !== "" && addData.namaKereta.trim() !== "" && addData.kelas.trim() !== "" && addData.destinasi.trim() !== "") {
      try {
        const q = query(collection(firestore, "dataKereta"), where("id_kereta", "==", addData.id_kereta));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          alert("ID Kereta sudah ada, silakan gunakan ID lain.");
        } else {
          const dataRef = collection(firestore, "dataKereta");
          await addDoc(dataRef, addData);
          alert(`Data berhasil disimpan`);
          router.push("/kereta");
        }
      } catch (error) {
        console.error("Error menambahkan dokumen:", error);
      }
    } else {
      alert("Silakan Lengkapi Inputan Data Kereta.");
    }
  };

  return (
    <div
      className="h-[90.5vh] w-screen-10 bg-cover bg-center"
      style={{ backgroundImage: `url(${kereta.src})` }}
    >
      <div className="flex items-center justify-center h-full">
        <div className="bg-[#eedef8] bg-opacity-75 backdrop-filter backdrop-blur-sm p-6 rounded shadow-md w-[500px]">
          <div className="flex flex-row items-center cursor-pointer" onClick={() => router.push('/kereta')}>
            <FaArrowLeftLong/>
            <h1 className="font-bold ml-2">Kembali</h1>
          </div>
          <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <h3 className="font-bold text-xl mb-5">Input Kereta</h3>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID Kereta</label>
              <input 
                value={addData.id_kereta}
                onChange={(e) =>
                  setAddData({ ...addData, id_kereta: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                required 
              />
            </div>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Kereta</label>
              <input 
                value={addData.namaKereta}
                onChange={(e) =>
                  setAddData({ ...addData, namaKereta: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                required 
              />
            </div>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kelas</label>
              <input 
                value={addData.kelas}
                onChange={(e) =>
                  setAddData({ ...addData, kelas: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                required 
              />
            </div>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Destinasi</label>
              <select
                value={addData.destinasi}
                onChange={(e) =>
                  setAddData({ ...addData, destinasi: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option value="" disabled>Pilih Destinasi</option>
                {stations.map((station) => (
                  <option key={station.id_stasiun} value={station.namaStasiun}>
                    {station.namaStasiun}
                  </option>
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

export default AddKereta;
