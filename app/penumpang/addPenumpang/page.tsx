"use client";
import rute from "../../asset/rute.jpg";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { firestore } from "../../../firebaseConfig";
import { useState, useEffect } from "react";

const AddRute = () => {
  const router = useRouter();
  const [addData, setAddData] = useState({
    id_penumpang: "",
    namaPenumpang: "",
    berangkat: "",
    noTempatDuduk: "",
    kelas: "",
  });

  const [ruteList, setRuteList] = useState<string[]>([]);
  const [keretaList, setKeretaList] = useState<string[]>([]);

  useEffect(() => {
    const fetchRuteData = async () => {
      const querySnapshot = await getDocs(collection(firestore, "dataRute"));
      const rutenData = querySnapshot.docs.map(
        (doc) => doc.data().berangkat as string
      );
      setRuteList(rutenData);
    };
    const fetchKeretaData = async () => {
      const querySnapshot = await getDocs(collection(firestore, "dataKereta"));
      const keretaData = querySnapshot.docs.map(
        (doc) => doc.data().kelas as string
      );
      setKeretaList(keretaData);
    };
    fetchKeretaData();
    fetchRuteData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      addData.id_penumpang.trim() !== "" &&
      addData.berangkat.trim() !== "" &&
      addData.namaPenumpang.trim() !== "" &&
      addData.noTempatDuduk.trim() !== "" &&
      addData.kelas.trim() !== ""
    ) {
      try {
        const q = query(
          collection(firestore, "dataPenumpang"),
          where("id_penumpang", "==", addData.id_penumpang)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          alert("ID Rute sudah ada, silakan gunakan ID lain.");
        } else {
          const dataRef = collection(firestore, "dataPenumpang");
          await addDoc(dataRef, addData);
          alert(`Data berhasil disimpan`);
          router.push("/penumpang");
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
      <div className="flex items-center justify-center h-full mx-auto px-4 max-w-4xl w-full md:px-0">
        <div className="bg-[#eedef8] bg-opacity-75 backdrop-filter backdrop-blur-sm p-6 rounded shadow-md w-[500px]">
          <div
            className="flex flex-row items-center cursor-pointer"
            onClick={() => router.push("/penumpang")}
          >
            <FaArrowLeftLong />
            <h1 className="font-bold ml-2">Kembali</h1>
          </div>
          <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <h3 className="font-bold text-xl mb-5">Input Penumpang</h3>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                ID Penumpang
              </label>
              <input
                value={addData.id_penumpang}
                onChange={(e) =>
                  setAddData({ ...addData, id_penumpang: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nama Penumpang
              </label>
              <input
                value={addData.namaPenumpang}
                onChange={(e) =>
                  setAddData({ ...addData, namaPenumpang: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Berangkat Dari Stasiun
              </label>
              <select
                value={addData.berangkat}
                onChange={(e) =>
                  setAddData({ ...addData, berangkat: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option value="">Pilih Stasiun</option>
                {ruteList.map((rute, index) => (
                  <option key={index} value={rute}>
                    {rute}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Kelas
              </label>
              <select
                value={addData.kelas}
                onChange={(e) =>
                  setAddData({ ...addData, kelas: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option value="">Pilih Stasiun</option>
                {keretaList.map((kereta, index) => (
                  <option key={index} value={kereta}>
                    {kereta}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                No Tempat Duduk
              </label>
              <input
                value={addData.noTempatDuduk}
                onChange={(e) =>
                  setAddData({ ...addData, noTempatDuduk: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
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
