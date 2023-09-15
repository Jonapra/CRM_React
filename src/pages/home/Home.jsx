import { ArcElement, CategoryScale,Chart as ChartJS, Legend,LinearScale,LineElement,PointElement,Title,Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Line,Pie } from 'react-chartjs-2';
import { BsFillPencilFill } from 'react-icons/bs';
import { MdCancel,MdOutlineDoneAll, MdPending } from 'react-icons/md';
import { TbProgressBolt } from 'react-icons/tb';

import Card from '../../components/Card';
import useTickets from '../../hooks/useTickets';
import HomeLayout from '../../layouts/Homelayout';

ChartJS.register(ArcElement, Legend, Title, Tooltip, CategoryScale,LinearScale,PointElement,LineElement);

function Home() {

    const [ticketsState] = useTickets();
    const [openTickets, setOpenTickets] = useState({});

    const pieChartData = {
        labels: Object.keys(ticketsState.ticketDistribution),
        fontColor: "white",
        datasets: [
            {
                label: "Tickets data",
                data: Object.values(ticketsState.ticketDistribution),
                backgroundColor: ["yellow", "red", "green", "blue", "purple", ],
                borderColor: ["yellow", "red", "green", "blue", "purple",],
                borderWidth: 1,
            }
        ]
    };


    const lineChartData = {
        labels: Object.keys(openTickets),
        fontColor: "white",
        datasets: [
            {
                label: "Open Tickets data",
                data: Object.values(openTickets),
                borderColor: 'rgb(255, 99, 132)',
            }
        ]
    };

    useEffect(() => {
        console.log(ticketsState);
        if(ticketsState.ticketList.length > 0 ) {
            let openTicketsData = {};
            ticketsState.ticketList.forEach(ticket => {
                const date = ticket.createdAt.split("T")[0];
                if(ticket.status == "open") {
                    openTicketsData[date] = (!openTicketsData[date]) ? 1 :  openTicketsData[date] + 1;
                }
            });
            setOpenTickets(openTicketsData);
        }
    }, [ticketsState.ticketList]);

    return (
        <HomeLayout>
            {ticketsState && (
                <div className='mt-10 flex flex-row justify-center items-center gap-5 flex-wrap'>
                <Card 
                    titleText='Open' 
                    status={ticketsState.ticketDistribution.open / ticketsState.downloadedTickets.length} 
                    quantity={ticketsState.ticketDistribution.open}
                    background='bg-yellow-300' 
                    borderColor='border-green-300' 
                    fontColor='text-black' 
                    dividerColor='bg-black'
                >
                    <BsFillPencilFill className='inline mr-2' />
                </Card>
                <Card 
                    titleText='In Progress' 
                    status={ticketsState.ticketDistribution.inProgress / ticketsState.downloadedTickets.length} 
                    quantity={ticketsState.ticketDistribution.inProgress}
                    background='bg-orange-300' 
                    borderColor='border-red-300' 
                    fontColor='text-black' 
                    dividerColor='bg-black'
                >
                    <TbProgressBolt className='inline mr-2' />
                </Card>
                <Card 
                    titleText='Resolved' 
                    status={ticketsState.ticketDistribution.resolved / ticketsState.downloadedTickets.length} 
                    quantity={ticketsState.ticketDistribution.resolved}
                    background='bg-purple-300' 
                    borderColor='border-blue-700' 
                    fontColor='text-black' 
                    dividerColor='bg-black'
                >
                    <MdOutlineDoneAll className='inline mr-2' />
                </Card>
                <Card 
                    titleText='On Hold' 
                    status={ticketsState.ticketDistribution.onHold / ticketsState.downloadedTickets.length} 
                    quantity={ticketsState.ticketDistribution.onHold}
                    background='bg-gray-300' 
                    borderColor='border-gray-800' 
                    fontColor='text-black' 
                    dividerColor='bg-black'
                >
                    <MdPending className='inline mr-2' />
                </Card>
                <Card 
                    titleText='Cancelled' 
                    status={ticketsState.ticketDistribution.cancelled / ticketsState.downloadedTickets.length} 
                    quantity={ticketsState.ticketDistribution.cancelled}
                    background='bg-blue-300' 
                    borderColor='border-violet-300' 
                    fontColor='text-black' 
                    dividerColor='bg-black'
                >
                    <MdCancel className='inline mr-2' />
                </Card>
                </div>
            )}
            <div className="mt-10 flex justify-center items-center gap-10">
                <div className="w-80 h-80 ">
                    <Pie data={pieChartData}/>
                </div>
                
            </div>
            <div className="mt-10 flex justify-center items-center gap-10">

                <div className="w-[40rem] h-[40rem]">
                    <Line data={lineChartData}/>
                </div>
            </div>
        </HomeLayout>
    );
}

export default Home;