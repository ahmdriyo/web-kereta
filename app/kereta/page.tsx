"use client";
import React, { useEffect, useState } from "react";
import kereta from "../asset/kereta.jpg";
import { useRouter } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";
import { useSession } from "next-auth/react";
import Loading from "../../components/Loading";

interface Route {
  id: string;
  namaKereta: string;
  kelas: string;
  destinasi: string;
}
const Kereta = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [routes, setRoutes] = useState<Route[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data: session, status } = useSession({
    required: false,
  });
  const handelAdd = () => {
    router.push("/kereta/addKereta");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataRef = collection(firestore, "dataKereta");
        const querySnapshot = await getDocs(dataRef);
        const routesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Route[];
        setRoutes(routesData);
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id: string) => {
    router.push(`/kereta/editKereta/${id}`);
  };

  const filteredRoutes = routes.filter((route) =>
    route.namaKereta.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="h-[90.5vh] w-screen-10 bg-cover bg-center"
      style={{ backgroundImage: `url(${kereta.src})` }}
    >
      <div className="flex items-center justify-center h-full">
        <div className="max-w-4xl mx-auto mt-10">
          <div className="bg-[#eedef8] bg-opacity-75 backdrop-filter backdrop-blur-sm p-6 rounded shadow-md">
            <h2 className="text-2xl mb-4 font-bold">Daftar Kereta</h2>
            <div className="flex mb-4">
              <input
                type="text"
                placeholder="Pencarian"
                className="flex-1 border p-2 rounded-l-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="bg-red-500 hover:bg-red-600  text-white p-2 rounded-r-md">
                Cari
              </button>
            </div>
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="border p-2">No.</th>
                  <th className="border p-2">Kereta</th>
                  <th className="border p-2">Kelas</th>
                  <th className="border p-2">Destinasi</th>
                </tr>
              </thead>
              {isLoading ? (
                <tbody className="justify-center items-center">
                <tr>
                  <td>
                    <Loading />
                  </td>
                  <td>
                    <Loading />
                  </td>
                  <td>
                    <Loading />
                  </td>
                  <td>
                    <Loading />
                  </td>
                </tr>
              </tbody>
              ):(
                <tbody>
                {filteredRoutes.map((route, index) => (
                  <tr key={route.id}>
                    <td className="border p-2 text-center">{index + 1}</td>
                    <td className="border p-2">{route.namaKereta}</td>
                    <td className="border p-2 text-center">{route.kelas}</td>
                    <td className="border p-2">{route.destinasi}</td>
                    {session?.user?.email === 'admin@gmail.com' &&(
                      <td className="border p-2">
                        <button
                          onClick={() => handleEdit(route.id)}
                          type="button"
                          className="bg-amber-600 text-white px-3 m-1 py-2 rounded-md hover:bg-amber-500 focus:outline-none focus:bg-amber-500"
                        >
                          Edit
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
              )}
              
            </table>
            {session?.user?.email === 'admin@gmail.com' && (
              <button
                onClick={handelAdd}
                type="submit"
                className="bg-indigo-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
              >
                Tambah
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kereta;
