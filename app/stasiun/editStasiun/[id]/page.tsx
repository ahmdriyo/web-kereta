"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../../firebaseConfig"; // sesuaikan path impor ini
import { FaArrowLeftLong } from "react-icons/fa6";
import stasiun from "../../../asset/stasiun.jpg";
const EditStasiun = ({params}) => {
  const router = useRouter();
  const [stasiunData, setStasiunData] = useState({
    namaStasiun: "",
    nomerPlatform: "",
  });


  useEffect(() => {
    if (params.id) {
      const fetchStasiunData = async () => {
        const docRef = doc(firestore, "dataStasiun",params.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setStasiunData(docSnap.data() as any);
        } else {
          console.log("No such document!");
        }
      };
      fetchStasiunData();
    }
  }, [params.id]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (params.id) {
      const docRef = doc(firestore, "dataStasiun", params.id);
      await updateDoc(docRef, stasiunData);
      alert("Data berhasil diperbarui");
      router.push("/stasiun");
    }
  };
  const handleDelete = async (event) => {
    event.preventDefault();
    if (params.id) {
      try {
        const docRef = doc(firestore, "dataStasiun", params.id);
        await deleteDoc(docRef);
        alert("Data berhasil dihapus");
        router.push("/stasiun");
      } catch (error) {
        console.error("Error deleting document:", error);
      }
    }
  };

  return (
    <div
      className="h-[90.5vh] w-screen-10 bg-cover bg-center"
      style={{ backgroundImage: `url(${stasiun.src})` }}
    >
      <div className="flex items-center justify-center h-full">
        <div className="bg-[#eedef8] bg-opacity-75 backdrop-filter backdrop-blur-sm p-6 rounded shadow-md w-[500px]">
          <div
            className="flex flex-row items-center cursor-pointer mb-4"
            onClick={() => router.push("/stasiun")}
          >
            <FaArrowLeftLong />
            <h1 className=" font-bold ml-2">Kembali</h1>
          </div>
          <form className="max-w-sm mx-auto">
            <h3 className="font-bold text-xl mb-5">Edit Stasiun</h3>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nama Stasiun
              </label>
              <input
                value={stasiunData.namaStasiun}
                onChange={(e) =>
                  setStasiunData({ ...stasiunData, namaStasiun: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nomer Platform
              </label>
              <input
                value={stasiunData.nomerPlatform}
                onChange={(e) =>
                  setStasiunData({ ...stasiunData, nomerPlatform: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            {}
            <button
              onClick={handleUpdate}
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Simpan
            </button>
            <button
              onClick={handleDelete}
              type="submit"
              className="text-white ml-3 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditStasiun;
