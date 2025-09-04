import { AnalyticsData } from "../../types/dashboard";
import { formatNumber } from "../../utils/format";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface AnalyticsProps {
  data: AnalyticsData;
}

export function Analytics({ data }: AnalyticsProps) {

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white">
          <div className="flex items-center">
            <div className="rounded-lg bg-white/20 p-3">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium">Views Today</h3>
              <p className="mt-1 text-2xl font-semibold">
                {formatNumber(
                  data.dailyViews[data.dailyViews.length - 1]?.views || 0
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white">
          <div className="flex items-center">
            <div className="rounded-lg bg-white/20 p-3">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium">Downloads Today</h3>
              <p className="mt-1 text-2xl font-semibold">
                {formatNumber(
                  data.dailyDownloads[data.dailyDownloads.length - 1]?.downloads ||
                    0
                )}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
          <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
            Views & Downloads
          </h3>
          <div className="aspect-[2/1]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data.dailyViews.map((view, index) => ({
                  date: new Date(view.date).toLocaleDateString(),
                  views: view.views,
                  downloads: data.dailyDownloads[index]?.downloads || 0,
                }))}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  formatter={(value) => formatNumber(Number(value))}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="downloads"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
          <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
            Popular Content
          </h3>
          <div className="space-y-4">
            {data.popularContent.map((content) => (
              <div
                key={content.item.id}
                className="flex items-center space-x-4"
              >
                <img
                  src={content.item.thumbnail}
                  alt={content.item.title}
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    {content.item.title}
                  </h4>
                  <div className="mt-1 flex text-sm text-gray-500 dark:text-gray-400">
                    <span className="mr-4">
                      {formatNumber(content.views)} views
                    </span>
                    <span>{formatNumber(content.downloads)} downloads</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    ${content.earnings.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    earned
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Geographic Distribution */}
      <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
        <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
          Top Countries
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.topCountries.map((country) => (
            <div
              key={country.country}
              className="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-900"
            >
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {country.country}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatNumber(country.views)} views
                </p>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatNumber(country.downloads)} downloads
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
