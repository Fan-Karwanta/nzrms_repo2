import React, { Component } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '@/components/Layout'

function ReportsAnalytics() {
  const navigate = useNavigate()

  return (
    <Layout>
      <div className="reports-analytics">
        <div className="reports-analytics-content">
          <iframe 
            style={{
              background: "#F1F5F4",
              border: "none",
              borderRadius: "2px",
              boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
              width: "100vw",
              height: "100vh"
            }}  
            src="https://charts.mongodb.com/charts-nzrms-ykcaidf/embed/dashboards?id=67808692-8cde-447f-8095-a2907d9f5ce1&theme=light&autoRefresh=true&maxDataAge=60&showTitleAndDesc=true&scalingWidth=fixed&scalingHeight=fixed"
          ></iframe>
        </div>
      </div>
    </Layout>
  )
}

export default ReportsAnalytics