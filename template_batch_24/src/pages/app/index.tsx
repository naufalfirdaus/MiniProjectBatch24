import React, { useEffect, useState } from "react";
import AppLayout from "../component/layout/AppLayout";
import Page from "../component/commons/Page";
import {
  BriefcaseIcon,
  ClipboardCheckIcon,
  CalendarIcon,
  ClipboardIcon,
} from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { getChartFetch, getSummaryFetch } from "@/redux/slices/dashboardSlices";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Dashboard() {
  const summary = useSelector((state: any) => state.dashboards.summary);
  const chartData = useSelector((state: any) => state.dashboards.chartData);
  const dispatch = useDispatch();
  const [fieldStudyChart, setFieldStudyChart] = useState<any>({
    options: {
      colors: ["#2a9d8f", "#264653", '#B8336A', '#815355'],
      chart: {
        height: 420,
        width: "100%",
        type: "pie",
      },
      stroke: {
        colors: ["white"],
        lineCap: "",
      },
      plotOptions: {
        pie: {
          labels: {
            show: true,
          },
          size: "100%",
          dataLabels: {
            offset: -25,
          },
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontFamily: "Inter, sans-serif",
        },
      },
      legend: {
        position: "bottom",
        fontFamily: "Inter, sans-serif",
      },
      yaxis: {
        labels: {
          formatter: function (value: any) {
            return value;
          },
        },
      },
      xaxis: {
        labels: {
          formatter: function (value: any) {
            return value;
          },
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      labels: ["Direct", "Organic search", "Referrals"],
    },
    series: [44, 55, 41]
  });
  const [educationChart, setEducationChart] = useState<any>({
    options: {
      colors: ["#2a9d8f", "#264653", '#B8336A', '#815355'],
      chart: {
        height: 420,
        width: "100%",
        type: "pie",
      },
      stroke: {
        colors: ["white"],
        lineCap: "",
      },
      plotOptions: {
        pie: {
          labels: {
            show: true,
          },
          size: "100%",
          dataLabels: {
            offset: -25,
          },
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontFamily: "Inter, sans-serif",
        },
      },
      legend: {
        position: "bottom",
        fontFamily: "Inter, sans-serif",
      },
      yaxis: {
        labels: {
          formatter: function (value: any) {
            return value;
          },
        },
      },
      xaxis: {
        labels: {
          formatter: function (value: any) {
            return value;
          },
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      labels: ["Direct", "Organic search", "Referrals"],
    },
    series: [44, 55, 41]
  });
  const [universityChart, setUniversityChart] = useState<any>({
    options: {
      colors: ["#2a9d8f", "#264653", '#B8336A', '#815355'],
      chart: {
        height: 420,
        width: "100%",
        type: "pie",
      },
      stroke: {
        colors: ["white"],
        lineCap: "",
      },
      plotOptions: {
        pie: {
          labels: {
            show: true,
          },
          size: "100%",
          dataLabels: {
            offset: -25,
          },
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontFamily: "Inter, sans-serif",
        },
      },
      legend: {
        position: "bottom",
        fontFamily: "Inter, sans-serif",
      },
      yaxis: {
        labels: {
          formatter: function (value: any) {
            return value;
          },
        },
      },
      xaxis: {
        labels: {
          formatter: function (value: any) {
            return value;
          },
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      labels: ["Direct", "Organic search", "Referrals"],
    },
    series: [44, 55, 41]
  });
  const [idleBoardChart, setIdleBoardChart] = useState<any>({
    options: {
      colors: ["#2a9d8f", "#264653", '#B8336A', '#815355'],
      chart: {
        height: 420,
        width: "100%",
        type: "pie",
      },
      stroke: {
        colors: ["white"],
        lineCap: "",
      },
      plotOptions: {
        pie: {
          labels: {
            show: true,
          },
          size: "100%",
          dataLabels: {
            offset: -25,
          },
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontFamily: "Inter, sans-serif",
        },
      },
      legend: {
        position: "bottom",
        fontFamily: "Inter, sans-serif",
      },
      yaxis: {
        labels: {
          formatter: function (value: any) {
            return value;
          },
        },
      },
      xaxis: {
        labels: {
          formatter: function (value: any) {
            return value;
          },
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      labels: ["Idle", "Boarding"],
    },
    series: [30, 70]
  });
  const [monthApplicantsChart, setMonthApplicantsChart] = useState<any>({
    options: {
      chart: {
        height: "100%",
        maxWidth: "100%",
        type: "line",
        fontFamily: "Inter, sans-serif",
        dropShadow: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        enabled: true,
        x: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 6,
        curve: "smooth",
      },
      grid: {
        show: true,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: -26,
        },
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: [
          "01 Feb",
          "02 Feb",
          "03 Feb",
          "04 Feb",
          "05 Feb",
          "06 Feb",
          "07 Feb",
        ],
        labels: {
          show: true,
          style: {
            fontFamily: "Inter, sans-serif",
            cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
    },
    series: [
      {
        name: "Clicks",
        data: [6500, 6418, 6456, 6526, 6356, 6456],
        color: "#2a9d8f",
      },
      {
        name: "CPC",
        data: [6456, 6356, 6526, 6332, 6418, 6500],
        color: "#264653",
      },
    ],
  });
  const [techChart, setTechChart] = useState<any>({
    options: {
      colors: ["#2a9d8f"],
      chart: {
        height: "420px",
        fontFamily: "Inter, sans-serif",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "70%",
          borderRadiusApplication: "end",
          borderRadius: 8,
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        style: {
          fontFamily: "Inter, sans-serif",
        },
      },
      states: {
        hover: {
          filter: {
            type: "darken",
            value: 1,
          },
        },
      },
      stroke: {
        show: true,
        width: 0,
        colors: ["transparent"],
      },
      grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: -14,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        floating: false,
        labels: {
          show: true,
          style: {
            fontFamily: "Inter, sans-serif",
            cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
      fill: {
        opacity: 1,
      },
    },
    series: [
      {
        name: "Total (Kandidat)",
        color: "#2a9d8f",
        data: [
          { x: "Mon", y: 232 },
          { x: "Tue", y: 113 },
          { x: "Wed", y: 341 },
        ],
      },
    ],
  });

  useEffect(() => {
    dispatch(getSummaryFetch());
    dispatch(getChartFetch());
    if (Object.keys(chartData).length != 0) {

      const tc = { ...techChart };
      tc.series[0].data = chartData.interestTech;
      setTechChart(tc);

      const uc = {...universityChart};
      const ucSeries = chartData.university.map((un: any) => un.total);
      const ucLabel = chartData.university.map((un: any) => un.school);
      uc.options.labels = ucLabel;
      uc.series = ucSeries;
      setUniversityChart(uc);
      
      const ec = {...educationChart};
      const ecSeries = chartData.educations.map((ec: any) => ec.total);
      const ecLabel = chartData.educations.map((ec: any) => ec.degree);
      ec.options.labels = ecLabel;
      ec.series = ecSeries;
      setEducationChart(ec);

      const fs = {...fieldStudyChart};
      const fsSeries = chartData.fieldStudy.map((un: any) => un.total);
      const fsLabel = chartData.fieldStudy.map((un: any) => un.fieldstudy);
      fs.options.labels = fsLabel;
      fs.series = fsSeries;
      setFieldStudyChart(fs);
    }
  }, [Object.keys(chartData).length]);

  return (
    <div>
      <AppLayout>
        <Page title="Home">
          <h1 className="text-lg font-medium">Summary</h1>
          {Object.keys(summary).length != 0 && (
            <div className="grid lg:grid-cols-4 pt-3 pb-10 gap-4 border-b-2">
              <div className="py-3 bg-white border border-gray-200 rounded-lg shadow hover:scale-105 transition-all">
                <div className="flex items-center">
                  <div className="px-3 font-medium">
                    <ClipboardCheckIcon className="h-6 w-6" />
                  </div>
                  <div className="border-l-2 pl-3">
                    <p className="text-lg font-medium ">Candidate</p>
                    <p className="font-normal text-gray-700">
                      {summary.allCandidate} Members
                    </p>
                  </div>
                </div>
              </div>
              <div className="py-3 bg-white border border-gray-200 rounded-lg shadow hover:scale-105 transition-all">
                <div className="flex items-center">
                  <div className="px-3 font-medium">
                    <CalendarIcon className="h-6 w-6" />
                  </div>
                  <div className="border-l-2 pl-3">
                    <p className="text-lg font-medium ">On Training</p>
                    <p className="font-normal text-gray-700">
                      {summary.onTraining} Members
                    </p>
                  </div>
                </div>
              </div>
              <div className="py-3 bg-white border border-gray-200 rounded-lg shadow hover:scale-105 transition-all">
                <div className="flex items-center">
                  <div className="px-3 font-medium">
                    <BriefcaseIcon className="h-6 w-6" />
                  </div>
                  <div className="border-l-2 pl-3">
                    <p className="text-lg font-medium ">On Boarding</p>
                    <p className="font-normal text-gray-700">
                      {summary.onBoarding} Members
                    </p>
                  </div>
                </div>
              </div>
              <div className="py-3 bg-white border border-gray-200 rounded-lg shadow hover:scale-105 transition-all">
                <div className="flex items-center">
                  <div className="px-3 font-medium">
                    <ClipboardIcon className="h-6 w-6" />
                  </div>
                  <div className="border-l-2 pl-3">
                    <p className="text-lg font-medium ">Idle</p>
                    <p className="font-normal text-gray-700">
                      {summary.idle} Members
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <h1 className="text-lg font-medium mt-3">Charts</h1>
          <div className="grid lg:grid-cols-3 gap-4 py-5">
            <div className="w-full bg-white border border-gray-200 rounded-lg shadow shadow-gray-200 p-4">
              <h5 className="text-md font-medium leading-none text-gray-900 dark:text-white pb-3">Applicants by Month</h5>
              <Chart
                options={monthApplicantsChart.options}
                series={monthApplicantsChart.series}
                type="line"
                height={300}
              />
            </div>
            <div className="w-full bg-white border border-gray-200 rounded-lg shadow shadow-gray-200 p-4">
              <h5 className="text-md font-medium leading-none text-gray-900 dark:text-white pb-3">Tech Interest</h5>
              <Chart
                options={techChart.options}
                series={techChart.series}
                type="bar"
                height={300}
              />
            </div>
            <div className="w-full bg-white border border-gray-200 rounded-lg shadow shadow-gray-200 p-4">
              <h5 className="text-md font-medium leading-none text-gray-900 dark:text-white pb-3">On Boarding & Idle</h5>
              <Chart
                options={idleBoardChart.options}
                series={idleBoardChart.series}
                type="pie"
                height={300}
              />
            </div>
            <div className="w-full bg-white border border-gray-200 rounded-lg shadow shadow-gray-200 p-4">
              <h5 className="text-md font-medium leading-none text-gray-900 dark:text-white pb-3">Degree</h5>
              <Chart
                options={educationChart.options}
                series={educationChart.series}
                type="pie"
                height={300}
              />
            </div>
            <div className="w-full bg-white border border-gray-200 rounded-lg shadow shadow-gray-200 p-4">
              <h5 className="text-md font-medium leading-none text-gray-900 dark:text-white pb-3">University</h5>
              <Chart
                options={universityChart.options}
                series={universityChart.series}
                type="pie"
                height={300}
              />
            </div>
            <div className="w-full bg-white border border-gray-200 rounded-lg shadow shadow-gray-200 p-4">
              <h5 className="text-md font-medium leading-none text-gray-900 dark:text-white pb-3">Field Study</h5>
              <Chart
                options={fieldStudyChart.options}
                series={fieldStudyChart.series}
                type="pie"
                height={300}
              />
            </div>
          </div>
        </Page>
      </AppLayout>
    </div>
  );
}
