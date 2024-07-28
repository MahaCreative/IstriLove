import { Link, Head, router } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import DataPekerjaan from "./data";
import SendIcon from "@mui/icons-material/Send";
import moment from "moment";
export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const inputRef = useRef();
    const dataPekerjaan = DataPekerjaan();
    useEffect(() => {
        inputRef.current.focus();
    });
    const [data, setData] = useState([]);
    const [nama, setNama] = useState("");
    let list = [];
    const handleKeyDown = async (event) => {
        if (event.key == "Enter") {
            const lengthData = dataPekerjaan.length;
            const randomNumber = Math.floor(Math.random() * lengthData);
            const dataToSend = {
                inisial: nama[0],
                nama: nama,
                pekerjaan: dataPekerjaan[randomNumber].pekerjaan,
                deskripsi: dataPekerjaan[randomNumber].deskripsi,
                uang: Math.floor(Math.random() * 10000000),
            };
            try {
                const response = await axios.post(
                    "store-pekerjaan",
                    dataToSend
                );
                list.push(response.data);
                setData([...data, JSON.parse(list)]);
                setNama("");
                console.log(data);
                inputRef.current.focus();
            } catch (error) {
                console.error("Error:", error);
            }
        }
    };

    return (
        <>
            <div className='w-full h-screen bg-[url("background.jpg")] bg-cover relative'>
                <div className="bg-black/50 backdrop-blur-[2px] w-full h-full absolute top-0 left-0">
                    <div className="mt-6 w-full">
                        <h1 className="font-share capitalize text-white  text-4xl text-center">
                            Pekerjaan Yang Cocok Untuk Kamu
                        </h1>
                        <p className="font-edu text-white tracking-tight text-lg text-center mt-3">
                            Komen Nama Kamu Dan Cari Pekerjaan Yang Cocok Untuk
                            Kamu
                        </p>
                    </div>
                    {/* Data Data */}
                    <div className="relative min-h-[70%] max-h-[70%] w-full flex justify-center overflow-y-auto">
                        <div className="w-[90%] min-h-full max-h-full  flex flex-col justify-end items-end overflow-x-hidden gap-2">
                            {/* ini datanya */}
                            {data.length > 0 &&
                                data.map((item, key) => (
                                    <div
                                        key={key}
                                        className="bg-white/80 backdrop-blur-sm px-4 py-2 w-[50%]  rounded-xl"
                                    >
                                        <div className="">
                                            <div className="flex justify-between items-center">
                                                <div className="flex gap-x-3 items-center">
                                                    <div className="text-xl font-edu lowercase text-black font-bold bg-blue-500 rounded-full w-[30px]  h-[30px] flex flex-col justify-center items-center">
                                                        <h1 className=" leading-none mb-1">
                                                            {item["inisial"]}
                                                        </h1>
                                                    </div>
                                                    <h1 className="text-blue-500 font-share text-2xl font-bold  tracking-widest leading-">
                                                        {item.nama}
                                                    </h1>
                                                </div>
                                                <p className="text-xs text-blue-500 font-edu">
                                                    {moment(new Date()).format(
                                                        "LLLL"
                                                    )}
                                                </p>
                                            </div>

                                            <div className="px-9">
                                                <p className="text-blue-500 font-share text-lg  tracking-wide italic font-bold">
                                                    {item.pekerjaan}
                                                </p>
                                                <p className="font-edu text-base">
                                                    {item.deskripsi}
                                                </p>
                                            </div>
                                            <div className="flex justify-center items-center">
                                                <div className="py-1 flex justify-between px-3 bg-blue-500 font-bold font-share text-lg text-white rounded-md w-[90%] text-center">
                                                    <p className="text-lg tracking-widest">
                                                        Uang Anda Dimasa depan
                                                    </p>
                                                    <h3>Rp. {item.uang}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="absolute bottom-6 w-full left-0 flex justify-center items-center px-16">
                        <div className="w-full b">
                            <input
                                value={nama}
                                onChange={(e) => setNama(e.target.value)}
                                ref={inputRef}
                                onKeyDown={handleKeyDown}
                                className="focus:border-none focus:outline-none focus:ring-0 active:border-none active:outline-none w-full rounded-md text-white font-bold text-center text-lg bg-blue-500/50 backdrop-blur-sm relative"
                            ></input>
                            <div className="absolute h-full top-0  right-16  flex justify-end items-center px-8">
                                <div className="text-xl text-white tracking-tighter leading-3 flex justify-center items-center ">
                                    <SendIcon
                                        color="inherit"
                                        fontSize="inherit"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
