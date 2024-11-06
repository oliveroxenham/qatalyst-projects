'use client';

import './sidebar.css';
import SideBarItem from './SideBar/SideBarItem';
import useDevice from '@/app/hooks/useDevice';
import { Menu } from '@/app/types/sideBar';
import Close from '../../public/icons/close.svg';
import IconSidebarAIEstimator from '../../public/icons/icon-sidebar-ai-estimator.svg';
import IconSidebarBenchmark from '../../public/icons/icon-sidebar-benchmark.svg';
import IconSidebarCollapse from '../../public/icons/icon-sidebar-collapse.svg';
import IconSidebarContract from '../../public/icons/icon-sidebar-contact.svg';
import IconSidebarDashboard from '../../public/icons/icon-sidebar-dashboard.svg';
import IconSidebarDocument from '../../public/icons/icon-sidebar-document.svg';
import IconSidebarEligibility from '../../public/icons/icon-sidebar-eligibility.svg';
import IconSidebarESG from '../../public/icons/icon-sidebar-esg.svg';
import IconSidebarExpand from '../../public/icons/icon-sidebar-expand.svg';
import IconSidebarHelp from '../../public/icons/icon-sidebar-help.svg';
import IconSidebarInfo from '../../public/icons/icon-sidebar-info.svg';
import IconSidebarInsurance from '../../public/icons/icon-sidebar-insurance.svg';
import IconSidebarKYC from '../../public/icons/icon-sidebar-kyc.svg';
import IconSidebarPDD from '../../public/icons/icon-sidebar-pdd.svg';
import IconSidebarScorecard from '../../public/icons/icon-sidebar-scorecard.svg';
import IconSidebarVerification from '../../public/icons/icon-sidebar-verification.svg';
import IconSidebarWorkspace from '../../public/icons/icon-sidebar-workspace.svg';
import Logo from '../../public/icons/logo.svg';
import Qatalyst from '../../public/icons/qatalyst.svg';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

export type Props = {
  isOpenSideBarMobile: boolean;
  projectId?: string;
  setIsOpenSideBarMobile: (value: boolean) => void;
  showProjectLinks?: boolean;
};

const SideBar: React.FC<Props> = ({
  isOpenSideBarMobile,
  projectId,
  setIsOpenSideBarMobile,
  showProjectLinks = false,
}) => {
  const router = useRouter();
  const currentPage = usePathname();
  const { isMobileView } = useDevice();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isExpandedTemporary, setIsExpandedTemporary] = useState<boolean>(false);

  const goHome = () => {
    router.push(`/projects`);
  };

  const onExpandSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const onClose = () => {
    setIsOpenSideBarMobile(false);
  };

  const menu: Menu = {
    help: [
      {
        icon: IconSidebarHelp,
        path: '',
        title: 'Help',
      },
    ],
    overview: [
      {
        icon: IconSidebarWorkspace,
        path: '/projects',
        title: 'My Workspace',
      },
      {
        icon: IconSidebarDashboard,
        path: '/dashboard',
        title: 'My Dashboard',
      },
    ],
    project: [
      {
        icon: IconSidebarInfo,
        path: projectId ? `/projects/${projectId}/info` : '',
        title: 'Project Details',
      },
      {
        icon: IconSidebarDocument,
        path: projectId ? `/projects/${projectId}/documents` : '',
        title: 'Documents',
      },
      {
        icon: IconSidebarEligibility,
        path: projectId ? `/projects/${projectId}/eligibility` : '',
        title: 'Financial Assessment',
      },
      {
        icon: IconSidebarESG,
        path: projectId ? `/projects/${projectId}/esg-assessment` : '',
        subMenu: [
          {
            path: '',
            title: 'Financial',
          },
          {
            path: '',
            title: 'ESG',
          },
        ],
        title: 'ESG Assessment',
      },
      {
        icon: IconSidebarScorecard,
        path: projectId ? `/projects/${projectId}/scorecard` : '',
        title: 'Scorecard',
      },
      {
        icon: IconSidebarScorecard,
        path: projectId ? `/projects/${projectId}/scorecard2` : '',
        title: 'Scorecard',
      },
      {
        icon: IconSidebarKYC,
        isNotDevelop: true,
        path: projectId ? `/projects/${projectId}/kyc` : '',
        title: 'KYC Assessment',
      },
      {
        icon: IconSidebarAIEstimator,
        isNotDevelop: true,
        path: '',
        title: 'AI Estimator',
      },
      {
        icon: IconSidebarBenchmark,
        isNotDevelop: true,
        path: '',
        title: 'Benchmark',
      },
      {
        icon: IconSidebarInsurance,
        isNotDevelop: true,
        path: '',
        title: 'Insurance',
      },
      {
        icon: IconSidebarContract,
        isNotDevelop: true,
        path: '',
        title: 'Contract',
      },
      {
        icon: IconSidebarPDD,
        isNotDevelop: true,
        path: '',
        title: 'PDD',
      },
      {
        icon: IconSidebarVerification,
        isNotDevelop: true,
        path: '',
        title: 'Verification',
      },
    ],
  };

  const onHoverEnter = () => {
    setIsExpandedTemporary(true);
  };

  const onHoverLeave = () => {
    setIsExpandedTemporary(false);
  };

  return (
    <aside
      onMouseEnter={onHoverEnter}
      onMouseLeave={onHoverLeave}
      className={`${!isOpenSideBarMobile && 'hidden'} ${isExpanded && 'sidebar-expanded'} sidebar absolute inset-y-0 left-0 z-50 transform md:sticky md:flex md:translate-x-0 md:flex-col md:justify-between`}
    >
      <nav className='sticky top-0 z-50 flex h-full flex-col'>
        <div className=''>
          {isMobileView ? (
            <button className={`${(isExpanded || isExpandedTemporary) && 'mt-6'}`} onClick={onClose} type='submit'>
              <Close width={24} height={24} color='#E5E7EB' />
            </button>
          ) : (
            <div className='m-5 flex flex-row items-center justify-between gap-3'>
              <div onClick={goHome} className='cursor-pointer'>
                {isExpanded || isExpandedTemporary ? (
                  <Image src={Qatalyst} alt='Qatalyst' width={128} height={32} className="stroke-white" />
                ) : (
                  <Image src={Logo} alt='Qatalyst' width={35} height={35} />
                )}
              </div>
              <div onClick={onExpandSidebar} className='cursor-pointer'>
                {isExpanded ? (
                  <Image src={IconSidebarCollapse} alt='Collapse' width={26} height={26} />
                ) : isExpandedTemporary ? (
                  <Image src={IconSidebarExpand} alt='Expand' width={26} height={26} />
                ) : null}
              </div>
            </div>
          )}
        </div>
        <div className='mx-2 h-full overflow-y-auto pt-2'>
          <SideBarItem currentPage={currentPage} menu={menu?.overview} title='Overview' />
          {showProjectLinks && (
            <div className='border-t border-gray-700 pt-4'>
              <SideBarItem currentPage={currentPage} menu={menu?.project} title='Project' />
            </div>
          )}
        </div>
        <div>
          <div className='mb-2 border-t border-gray-700' />
          <SideBarItem currentPage={currentPage} menu={menu?.help} />
        </div>
      </nav>
    </aside>
  );
};

export default SideBar;
