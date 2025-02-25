import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Props {
  data: {
    date: string;
    count: number;
    guests: number;
  }[];
  loading: boolean;
}

export default function ReservationChart({ data, loading }: Props) {
  const chartData = {
    labels: data.map(d => format(new Date(d.date), 'dd MMM', { locale: fr })),
    datasets: [
      {
        label: 'Réservations',
        data: data.map(d => d.count),
        borderColor: '#d97706',
        backgroundColor: 'rgba(217, 119, 6, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Couverts',
        data: data.map(d => d.guests),
        borderColor: '#84cc16',
        backgroundColor: 'rgba(132, 204, 22, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#e5e7eb'
        }
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: '#ffffff',
        bodyColor: '#e5e7eb',
        borderColor: '#4b5563',
        borderWidth: 1,
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        },
        callbacks: {
          title: (items: any[]) => `${items[0].label}`,
          label: (item: any) => {
            const value = item.raw;
            const label = item.dataset.label;
            return ` ${label}: ${value}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(75, 85, 99, 0.2)'
        },
        ticks: {
          color: '#9ca3af'
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(75, 85, 99, 0.2)'
        },
        ticks: {
          color: '#9ca3af',
          stepSize: 4
        }
      }
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false
    }
  };

  if (loading) {
    return (
      <div className="h-[400px] flex items-center justify-center text-gray-400">
        Chargement des données...
      </div>
    );
  }

  return (
    <div className="h-[200px]">
      <Line data={chartData} options={options} />
    </div>
  );
}