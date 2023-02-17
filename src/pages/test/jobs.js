import { useState, useEffect } from 'react'
import Head from 'next/head'
import Card from "../../components/Card"
import axios from 'axios'
import style from "../../styles/Jobs.module.css"

export default function Jobs() {

  const [jobs, setJobs] = useState([])
  const [totalJobs, setTotalJobs] = useState({})

  // Request parameters
  const jobsURL = "https://www.zippia.com/api/jobs/"
  const jobsRequestBody = {
      "companySkills": true,
      "dismissedListingHashes": [],
      "fetchJobDesc": true,
      "jobTitle": "Business Analyst",
      "locations": [],
       "numJobs": 20,
       "previousListingHashes": []}

  // REQUEST DATA WHEN THE PAGE IS LOADED
  useEffect(function(){
      axios.post(jobsURL, jobsRequestBody)
      .then(response => response.data)
      .then(data => {
        setTotalJobs(data.totalJobs)
        return data.jobs
      })
      .then(jobs => setJobs(jobs.slice(0,10)))
      .catch(err => console.log(err))
  }, [])

  // FILTER DATA FOR THE LAST 7 DAYS
  function last7DaysJobs(){
    let today = new Date();
    let oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    setJobs(previous => previous.filter(item => {
      const date = new Date(item.OBJpostingDate)
      return date >= oneWeekAgo && date <= today
    }))
  }

  // SORT DATA BY COMPANY NAME
  function sortByCompanyName(){
    let list = [...jobs].sort((a, b) => {
      if (a.companyName < b.companyName) return -1;
      if (a.companyName > b.companyName) return 1;
      return 0;
    })
    setJobs(list)
  }

  return (
    <>
      <Head>
        <title>Jobs List</title>
        <meta name="description" content="Route of the Job offers page"/>
      </Head>
    <main className={style.jobsMain}>
      <div className={style.jobsContent}>
        <h2>{`DEVELOPER JOBS NEAR ME ${jobs.length>0 ? `- ${totalJobs} JOBS`: ""}`}</h2>
        <div className={style.buttonBox}>
          <button disabled={!jobs.length>0} onClick={sortByCompanyName}>Order by company name</button>
          <button disabled={!jobs.length>0} onClick={last7DaysJobs}>Last 7 days</button>
        </div>
        <ul>
          {jobs.map(job => <Card key={job.jobId} jobTitle={job.jobTitle} companyName={job.companyName} jobDescription={job.jobDescription}/>)}
        </ul>
      </div>
    </main>
    </>
  )
}
