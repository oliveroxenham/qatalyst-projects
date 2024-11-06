'use client';

import { clearCreatedProject } from '@/app/redux/reducers/project.slice';
import { MenuItem } from '@/app/types/sideBar';
import clsx from 'clsx';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import Image from 'next/image';

export type Props = {
  additionStyle?: string;
  currentPage: string;
  menu: MenuItem[];
  title?: string;
};

const SideBarItem: React.FC<Props> = ({
  additionStyle,
  currentPage,
  menu,
  title,
}) => {
  const dispatch = useDispatch();

  return (
    <div className={`${additionStyle} mb-4`}>
      {title && (
        <p className="sitebar-text mb-2 text-xs font-semibold tracking-[-0.3px] text-stone-400">
          {title}
        </p>
      )}
      <div className="">
        <ul className="space-y-2">
          {menu?.map((item) =>
            !item.isNotDevelop ? (
              <li
                onClick={() => {
                  if (title === 'Overview') {
                    dispatch(clearCreatedProject());
                  }
                }}
                className={clsx(
                  currentPage === item.path && 'active',
                  'hover:cursor-pointer'
                )}
                key={item.title}
              >
                <Link
                  className="flex h-7 flex-row items-center justify-between px-2 text-sm hover:cursor-pointer"
                  href={item.path}
                >
                  <div className="flex flex-row items-center">
                    <span className="inline-block h-5 w-5">
                      {item.icon && <Image
                        src={item.icon}
                        width={24}
                        height={24}
                        alt={item.title}
                        className="stroke-white"
                      />}
                    </span>
                    <span className="sidebar-text pl-2 text-xs font-medium text-gray-200">
                      {item.title}
                    </span>
                  </div>
                </Link>
              </li>
            ) : (
              <li
                onClick={() => {
                  if (title === 'Overview') {
                    dispatch(clearCreatedProject());
                  }
                }}
                className={clsx(
                  currentPage === item.path && 'active',
                  `tooltip hover:cursor-default hover:bg-transparent`
                )}
                key={item.title}
              >
                <Link
                  className="flex h-7 flex-row items-center justify-between px-2 text-sm hover:cursor-default"
                  href=""
                >
                  <div className="flex flex-row items-center">
                    <span className="inline-block h-6 w-6">
                      <Image
                        src={item.icon}
                        width={24}
                        height={24}
                        alt={item.title}
                        className="stroke-white"
                      />
                    </span>
                    <span className="sidebar-text pl-2 text-xs font-medium text-[#E5E7EB50]">
                      {item.title}
                    </span>
                  </div>
                </Link>

                <Tooltip
                  anchorSelect=".tooltip"
                  place="right"
                  style={{
                    backgroundColor: '#262626',
                    borderRadius: 8,
                    color: '#fff',
                    fontSize: 12,
                    height: 32,
                    marginLeft: 16,
                  }}
                >
                  Coming soon!
                </Tooltip>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default SideBarItem;
