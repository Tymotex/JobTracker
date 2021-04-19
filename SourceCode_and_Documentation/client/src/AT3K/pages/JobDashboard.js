import Cookies from "js-cookie";
import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import JobDashboardIndex from "./JobDashboardIndex";
import JobDashboardWorkspace from "./JobDashboardWorkspace";
import axios from "axios";
import api from "../constants/api";
import { useEffect } from "react";
import { Notification } from "../components/notification";
import pageStyles from "./Page.module.scss";

const tempCompanies = [
  // {
  //     name: "Canva",
  //     description: `
  //         Canva is a graphic design platform, used to create social media graphics, presentations, posters, documents and other visual content. The app includes templates for users to use. The platform is free to use and offers paid subscriptions like Canva Pro and Canva for Enterprise for additional functionality.
  //     `,
  //     link: "/search/company"
  // },
  // {
  //     name: "Atlassian",
  //     description: `
  //         Atlassian Corporation Plc is an Australian software company that develops products for software developers and project managers.
  //     `,
  //     link: "/search/company"
  // }
];

const JobDashboard = () => {
  // TODO: store the boardtype under cookies/localStorage
  // so that the site remembers the user's preferences
  const [boardType, setBoardType] = useState("spreadsheet".toLowerCase());
  const [selectedBoard, setBoard] = useState(null);
  const [boards, setBoards] = useState(null);
  const [boardSortStrategy, setBoardSortStrategy] = useState(null);
  const [companies, setCompanies] = useState(null);

  const handleChangeBoard = (event) => {
    setBoardType(event.target.value);
  };

  const handleSelectBoard = (boardID) => {
    setBoard(boardID);
  };

  const handleDeselectBoard = () => {
    setBoard(null);
  };

  const handleSetBoardSorter = (event) => {
    setBoardSortStrategy(event.target.value);
  };

  // ===== GET /api/user/boards =====
  const userID = Cookies.get("user_id");

  const fetchBoards = () => {
    // Fetches the currently logged in user's boards
    if (userID) {
      axios
        .get(`${api.BASE_URL}/api/user/boards?user_id=${userID}`)
        .then((response) => {
          setBoards(response.data);
        });
    } else {
      Notification.spawnRegisterError();
    }
  };

  // ===== GET /api/user/companies =====
  const fetchCompanies = async () => {
    // Fetches the currently logged in user's companies
    if (userID) {
      const tempCompanies = [];
      const res = await axios.get(
        `${api.BASE_URL}/api/user/company?user_id=${userID}`
      );
      // clear the favourite company array
      tempCompanies.splice(0, tempCompanies.length);
      res.data.map((company) => {
        tempCompanies.push({
          name: company,
          link: "/search/company",
          // FIXME
          description: "",
          // description: "Canva is a graphic design platform, used to create social media graphics, presentations, posters, documents and other visual content. The app includes templates for users to use. The platform is free to use and offers paid subscriptions like Canva Pro and Canva for Enterprise for additional functionality."
        });
      });
      setCompanies(tempCompanies);
      Promise.all(
        tempCompanies.map((company) => {
          return axios.get(
            `${api.BASE_URL}/api/company?company=${company.name}&disable_jobs=true`
          );
        })
      )
        .then((res) => {
          const final_companies = res.map((company) => {
            return {
              name : company.data.company_info.company_name,
              link: "/search/company",
              description: company.data.company_info.company_details
            }
          })
          setCompanies(final_companies);
        })
        .catch((err) => console.log(err));
      // for (let i = 0; i < tempCompanies.length; i++) {
      //   const comp_res = await axios.get(
      //     `${api.BASE_URL}/api/company?company=${tempCompanies[i].name}&disable_jobs=true`
      //   );
      //   const company_dets = comp_res.data.company_info.company_details;
      //   tempCompanies[i].description = company_dets;
      // }
    } else {
      Notification.spawnRegisterError();
    }
  };

  useEffect(() => {
    fetchBoards();
    fetchCompanies();
  }, []);

  // ================================

  return (
    <Layout>
      <div className={pageStyles.container}>
        {selectedBoard === null ? (
          <JobDashboardIndex
            boards={boards}
            companies={companies}
            handleSelectBoard={handleSelectBoard}
            updateBoardList={fetchBoards}
            boardSortStrategy={boardSortStrategy}
            handleSetBoardSorter={handleSetBoardSorter}
            fetchBoards={fetchBoards}
          />
        ) : (
          <JobDashboardWorkspace
            boardType={boardType}
            selectedBoardID={selectedBoard}
            handleChangeBoard={handleChangeBoard}
            handleDeselectBoard={handleDeselectBoard}
          />
        )}
      </div>
    </Layout>
  );
};

export default JobDashboard;
