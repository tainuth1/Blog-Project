import React from "react";

const MyPost = () => {
  return (
    <div>
      <div className="flex justify-between items-center ">
        <div className="flex items-center gap-5">
          <h1 className="font-semibold text-3xl text-gray-800">My Post</h1>
        </div>
      </div>
      <div class="overflow-x-auto mt-4">
        <table class="min-w-full text-left bg-white overflow-hidden rounded-lg dark:bg-gray-800">
          <thead>
            <tr class="border-b-[1px] border-gray-200 dark:border-gray-400 bg-gray-100 dark:bg-gray-700">
              <th class="px-6 py-4 text-[14px] text-gray-700 font-semibold dark:text-gray-300">
                #
              </th>
              <th class="px-6 py-4 text-[14px] text-gray-700 font-semibold dark:text-gray-300">
                Title
              </th>
              <th class="px-6 py-4 text-[14px] text-gray-700 font-semibold dark:text-gray-300">
                Category
              </th>
              <th class="px-6 py-4 text-[14px] text-gray-700 font-semibold dark:text-gray-300">
                Discription
              </th>
              <th class="px-6 py-4 text-[14px] text-gray-700 font-semibold dark:text-gray-300">
                Thumbnail
              </th>
              <th class="px-6 py-4 text-[14px] text-gray-700 font-semibold dark:text-gray-300">
                Action
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-600">
            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-3 text-[14px] dark:text-gray-200">#1</td>
              <td class="px-6 py-3">
                <span class="w-[150px] text-[14px] inline-block whitespace-nowrap overflow-hidden text-ellipsis font-medium dark:text-gray-200">
                  Cherry Delight
                </span>
              </td>
              <td class="px-6 py-3 text-[14px] text-gray-600 dark:text-gray-300">
                Dessert
              </td>
              <td class="px-6 py-3 text-[14px] text-gray-600 dark:text-gray-300">
                $90.50
              </td>
              <td class="px-6 py-3 text-[14px]">
                <span class="inline-block px-3 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                  Active
                </span>
              </td>
              <td class="px-6 py-4 relative">
                <button class="text-gray-500 hover:text-gray-700 dark:text-gray-400">
                  <i class="bx bx-dots-horizontal-rounded text-[24px]"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPost;
