'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { deleteDoc, doc, getDoc, updateDoc, collection, query, getDocs } from "firebase/firestore";
import { firestore } from "../../../../firebaseConfig"; 
import { FaArrowLeftLong } from "react-icons/fa6";
import kereta from "../../../asset/kereta.jpg";
type Station = {
  id_stasiun: string;
  namaStasiun: string;
  nomerPlatform: string;
};
const EditRute = ({ params }) => {
  const router = useRouter();
  const [dataKereta, setDataKereta] = useState({
    namaKereta: "",
    kelas: "",
    destinasi: "",
    namaStasiunDestinasi: "",
  });
  const [stations, setStations] = useState<Station[]>([]);

  useEffect(() => {
    if (params.id) {
      const fetchDataKereta = async () => {
        const docRef = doc(firestore, "dataKereta", params.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDataKereta(docSnap.data() as any);
        } else {
          console.log("No such document!");
        }
      };
      fetchDataKereta();
    }
  }, [params.id]);

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

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (params.id) {
      const docRef = doc(firestore, "dataKereta", params.id);
      await updateDoc(docRef, dataKereta);
      alert("Data berhasil diperbarui");
      router.push("/kereta");
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    if (params.id) {
      try {
        const docRef = doc(firestore, "dataKereta", params.id);
        await deleteDoc(docRef);
        alert("Data berhasil dihapus");
        router.push("/kereta");
      } catch (error) {
        console.error("Error deleting document:", error);
      }
    }
  };

  return (
    <div
      className="h-[90.5vh] w-screen-10 bg-cover bg-center"
      style={{ backgroundImage: `url(${kereta.src})` }}
    >
      <div className="flex items-center justify-center h-full">
        <div className="bg-[#eedef8] bg-opacity-75 backdrop-filter backdrop-blur-sm p-6 rounded shadow-md w-[500px]">
          <div
            className="flex flex-row items-center cursor-pointer mb-4"
            onClick={() => router.push("/kereta")}
          >
            <FaArrowLeftLong />
            <h1 className=" font-bold ml-2">Kembali</h1>
          </div>
          <form className="max-w-sm mx-auto" onSubmit={handleUpdate}>
            <h3 className="font-bold text-xl mb-5">Edit Kereta</h3>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nama Kereta
              </label>
              <input
                value={dataKereta.namaKereta}
                onChange={(e) =>
                  setDataKereta({ ...dataKereta, namaKereta: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Kelas
              </label>
              <input
                value={dataKereta.kelas}
                onChange={(e) =>
                  setDataKereta({ ...dataKereta, kelas: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Destinasi
              </label>
              <select
                value={dataKereta.destinasi}
                onChange={(e) =>
                  setDataKereta({ ...dataKereta, destinasi: e.target.value })
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
            <button
              onClick={handleDelete}
              type="button"
              className="text-white ml-3 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Hapus
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditRute;
