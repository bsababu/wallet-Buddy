"use client";
import React, { useEffect, useState } from 'react'
import Footer from './ui/footer'
import Siderbar from './ui/sidebar'
import Menu from './ui/menu'
import Expenses from './expenses';
import Chart from 'chart.js/auto';
import { useRouter, usePathname, useSearchParams,redirect } from 'next/navigation';
import Link from 'next/link';
import Settings from './settings';
import { revalidatePath } from 'next/cache'

const Index = () => {

    const [selectedNavItem, setSelectedNavItem] = useState('dashboard'); // 'home', 'settings', 'expenses', 'savings', 'loans'
    const [showExpense, setShowExpense] = useState(false);
    const [showsettings, setShowSettings] = useState(false);
    const [showLoans, setShowLoans] = useState(false);
    const router = useRouter();
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const style = {
        marginRight: 10,
        color: 'grey'
    }


    useEffect(() => {
        const lineChartCanvas = document.getElementById('lineChart') as HTMLCanvasElement | null;
        const barChartCanvas = document.getElementById('barChart') as HTMLCanvasElement | null;
        const piChartCanvas = document.getElementById('pieChart') as HTMLCanvasElement | null;

        // piChartCanvas?.height = 20;

        if (lineChartCanvas && barChartCanvas && piChartCanvas) {
            // Destroy existing charts, if any
            Chart.getChart(lineChartCanvas)?.destroy();
            Chart.getChart(barChartCanvas)?.destroy();
            Chart.getChart(piChartCanvas)?.destroy();

            // Sample data for charts (replace with actual data)
            const lineChartData = {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    label: 'Expenses',
                    data: [2000, 2200, 1800, 2400, 2100, 2300, 2500],
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                }]
            };
            const pieData = {
                labels: [
                    'Red',
                    'Blue',
                    'Yellow'
                ],
                datasets: [{
                    label: 'My First Dataset',
                    borderRadius: 14,
                    data: [100, 30, 70],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)'
                    ],
                    hoverOffset: 2
                }]
            };
            const barChartData = {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: 'use of expenses',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                }]
            };

            // Create line chart
            new Chart(lineChartCanvas, {
                type: 'line',
                data: lineChartData,
            });

            // Create bar chart
            new Chart(barChartCanvas, {
                type: 'bar',
                data: barChartData,
            });

            //pie
            new Chart(piChartCanvas, {
                type: 'pie',
                data: pieData,
            });
        }
    }, [pathname, searchParams]); // Empty dependency array means this effect runs once after initial render

    const handleNavItemSelect = (item: React.SetStateAction<string>) => {
        setSelectedNavItem(item);
        if (item === 'expenses') {
            setShowExpense(true); // Show settings content when settings menu item is clicked
            console.log("showw");

        } else {
            setShowExpense(false); // Hide settings content for other menu items
        }
        router.push(`/dashboard/?${item}`, undefined, { shallow: true });
    };
    return (
        <>
            <div className="flex h-screen flex-wrap">
                {/* Sidebar */}
                <div className="w-60 bg-gray-800 text-white">
                    <div className="p-4">
                        <Link href="/dashboard">
                            <h2 className="text-lg font-semibold mb-4">ReceiptVault</h2>
                        </Link>
                        
                        <div className="divider"></div>
                        <div className='mt-20'>
                            <ul className='mt-20 py-2 align-middle justify-center'>
                                <Link href="/dashboard">
                                    <li
                                        className='cursor-pointer py-2 hover:bg-gray-600 hover:text-gray-300 px-4 active:bg-gray-400 rounded mb-2'
                                    >
                                        Dashboard
                                    </li>
                                </Link>
                                <li
                                    className={`cursor-pointer py-2 px-4 rounded mb-2  hover:bg-gray-600 hover:text-gray-300 
                                    ${selectedNavItem === 'settings' ? 'bg-gray-700' : ''
                                        }`}
                                    onClick={() => handleNavItemSelect('settings')}
                                >
                                    Settings
                                </li>
                                <li
                                    className={`cursor-pointer py-2 px-4 rounded mb-2  hover:bg-gray-600 hover:text-gray-300 
                                ${selectedNavItem === 'expenses' ? 'bg-gray-700' : ''
                                        }`}
                                    onClick={() => handleNavItemSelect('expenses')}
                                >
                                    Expenses
                                </li>
                                <li
                                    className={`cursor-pointer py-2 px-4 rounded mb-2  hover:bg-gray-600 hover:text-gray-300 ${selectedNavItem === 'savings' ? 'bg-gray-700' : ''
                                        }`}
                                    onClick={() => handleNavItemSelect('savings')}
                                >
                                    Savings
                                </li>
                                <li
                                    className={`cursor-pointer py-2 px-4 rounded mb-2  hover:bg-gray-600 hover:text-gray-300 ${selectedNavItem === 'loans' ? 'bg-gray-700' : ''
                                        }`}
                                    onClick={() => handleNavItemSelect('loans')}
                                >
                                    Loans
                                </li>
                                <div className='pb-40'>
                                    <Link href="/">
                                        <li
                                            className='cursor-pointer py-2 px-4 rounded mb-2  hover:bg-gray-600 hover:text-gray-300'
                                        >
                                            Log Out
                                        </li></Link>
                                </div>

                            </ul>
                        </div>
                    </div>
                </div>
                < div className="flex-1" >
                    {/* Navbar */}
                    < div className="bg-base-200 p-3" >
                        <div className="flex items-center justify-between">

                            {/* recommendation */}
                            {/* Open the modal using document.getElementById('ID').showModal() method */}
                            <button className="btn btn-outline btn-warning rounded mb-2  hover:bg-gray-600"
                                onClick={() => (document.getElementById('my_modal_5') as HTMLDialogElement).showModal()}>Recommendation
                            </button>
                            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg">Advice!</h3>
                                    <p className="py-4">based on your monthly expenses, we advice to keep up with the pace you are on
                                        on your expenses</p>
                                    <div className="modal-action">
                                        <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button className="btn">Close</button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
                            {/* Replace with notifications */}
                            <div className=' flex mr-4'>
                                <input type="text" placeholder="Search" className="input pl-12 input-bordered w-24 md:w-auto" />
                                <img
                                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                                    alt="User"
                                    className="w-8 h-8 rounded-full ml-2"
                                /></div>
                        </div>
                    </div >


                    {/* Dashboard Content */}
                    <div className='p-4'>
                        {showExpense ? (
                            <Expenses />

                        ) : (
                            <>
                                <div className="flex-1 p-4 overflow-hidden flex-grow">
                                    <div className="flex gap-8">
                                        <div className="card w-48 bg-base-100 shadow-xl">
                                            <div className="card-body">
                                                <h2 className="card-title">Savings</h2>
                                                <div className="badge badge-lg">987,654</div>
                                            </div>
                                        </div>

                                        <div className="card w-48 bg-base-100 shadow-xl">
                                            <div className="card-body">
                                                <h2 className="card-title">Loans</h2>
                                                <div className="badge badge-lg">987,654</div>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="flex-1 flex-wrap p-4 overflow-hidden ">
                                    <div className="flex flex-wrap gap-3">
                                        <div className="flex-1 bg-white-500 rounded-md p-4">
                                            <h2 className="text-lg font-semibold mb-3">Saving Chart</h2>
                                            <canvas id="lineChart" width="80" height="50"></canvas>
                                        </div>
                                        <div className="flex-1 bg-white-700 rounded-md p-4">
                                            <h2 className="text-lg font-semibold mb-4">Expenses Chart</h2>
                                            <canvas id="barChart" width="80" height="50"></canvas>
                                        </div>
                                        <div className="flex-1 bg-white-700 rounded-md p-4">
                                            <h2 className="font-semibold mb-4">Loans Chart</h2>
                                            <canvas className="top-0 left-0 w-2 h-2" width="10" height="10" id="pieChart"></canvas>
                                        </div>
                                    </div>
                                </div>
                            </>)}
                    </div>
                    {/* Settings */}
                    {/* expenses */}
                    {/* savings */}
                    {/* Loans */}

                </div >

            </div>
            <div><Footer></Footer></div>
        </>

    )
}

export default Index