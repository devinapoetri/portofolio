import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    title: "Bank Marketing Term Deposit Prediction Using Neural Network (MLP)",
    description:
      "Built a neural network classification model to predict bank customer subscription to term deposits using direct marketing campaign data.",
    longDescription:
      "A classification project using the UCI Bank Marketing dataset to predict customer subscription to term deposits based on demographic, financial, and campaign-related features. The workflow includes label encoding for categorical features, class distribution analysis, and handling severe class imbalance through Undersampling, Oversampling, and SMOTE techniques. A Multi-Layer Perceptron (MLP) Neural Network classifier was trained and evaluated using accuracy, confusion matrix, and classification report. The model was further optimized through Hyperparameter Tuning with GridSearchCV across multiple parameters (hidden layer sizes, activation function, solver, alpha, and learning rate), and the tuned model's performance was compared against the baseline model to measure improvement in predictive accuracy and recall.",
    category: "Machine Learning",
    image: "/project/bank.png",
    images: [
      "/project/bank.png",

    ],
    tags: [
      "Python",
      "Neural Network",
      "MLPClassifier",
      "Classification",
      "Bank Marketing",
      "SMOTE",
      "GridSearchCV",
      "scikit-learn"
    ],
    datasetOverview: {
      source: "UCI Machine Learning Repository - Bank Marketing Dataset",
      rows: "45,211",
      features: "16",
      target: "Subscription Status",
    },
    workflow: [
      {
        title: "Data Understanding",
        description:
          "Explored the bank marketing dataset structure, examined feature types (demographic, financial, and campaign-related), and identified the target label (subscription status)."
      },
      {
        title: "Feature & Label Preparation",
        description:
          "Separated features and target label, then applied Label Encoding to convert categorical variables into numerical format for model compatibility."
      },
      {
        title: "Class Distribution Analysis",
        description:
          "Visualized the distribution of the target classes to identify significant class imbalance between subscribed and non-subscribed customers."
      },
      {
        title: "Imbalanced Data Handling",
        description:
          "Addressed class imbalance using three techniques: Random Undersampling, Random Oversampling, and SMOTE, then evaluated the resulting class distributions."
      },
      {
        title: "Train-Test Split & Scaling",
        description:
          "Split the dataset into training and testing sets with stratification, then standardized features using StandardScaler before applying SMOTE to the training data."
      },
      {
        title: "Neural Network Modeling",
        description:
          "Built an MLPClassifier with three hidden layers (128, 64, 32 neurons), ReLU activation, and Adam optimizer, then trained the model and evaluated its performance using accuracy, confusion matrix, and classification report."
      },
      {
        title: "Hyperparameter Tuning (GridSearchCV)",
        description:
          "Performed hyperparameter optimization across hidden layer sizes, activation function, solver, alpha, and learning rate, using recall as the scoring metric with 3-fold cross-validation."
      },
      {
        title: "Optimized Model Evaluation",
        description:
          "Retrained the model using the best parameters found through GridSearchCV, then compared its performance against the baseline model to assess the improvement in accuracy and recall."
      }
    ],
    modelMetrics: {
      beforeHPO: {
        accuracy: 0.86,
        class0: { precision: 0.95, recall: 0.89, f1: 0.92 },
        class1: { precision: 0.44, recall: 0.64, f1: 0.52 },
        macroAvg: { precision: 0.69, recall: 0.77, f1: 0.72 },
        weightedAvg: { precision: 0.89, recall: 0.86, f1: 0.87 },
      },
      afterHPO: {
        accuracy: 0.85,
        class0: { precision: 0.96, recall: 0.86, f1: 0.91 },
        class1: { precision: 0.42, recall: 0.76, f1: 0.54 },
        macroAvg: { precision: 0.69, recall: 0.81, f1: 0.73 },
        weightedAvg: { precision: 0.90, recall: 0.85, f1: 0.87 },
      },
    },
  },
  {
    id: "2",
    title: "Bank Customer Churn Analysis",
    description: "Analyzed customer churn behavior using a Kaggle dataset of 10,000 bank customers across 3 countries.",

    longDescription:
      "A data analysis project focused on understanding customer churn behavior in a banking dataset from Kaggle. The dataset contains 10,000 customers with 18 variables covering demographics, financial behavior, satisfaction level, and churn status. The analysis aims to identify key factors influencing customer churn such as geography, age, account balance, number of products, complaints, and activity status. The final output provides business insights and recommendations to improve customer retention strategy.",

    category: "Data",

    image: "/project/churn-dashboard1.png",

    images: [
      "/project/churn-dashboard1.png"
    ],

    tags: [
      "Tableau",
      "Data Analysis",
      "Data Visualization",
      "EDA",

    ],

    datasetOverview: {
      source: "Kaggle - Bank Customer Churn Prediction",
      rows: "10,000",
      features: "18"
    },

    workflow: [
      {
        title: "Data Understanding",
        description: "Explored dataset structure including demographic, financial, behavioral, and churn-related variables to understand data distribution and relationships."
      },
      {
        title: "Exploratory Data Analysis",
        description: "Analyzed churn distribution across geography, age groups, balance levels, activity status, complaints, and number of products using visual analytics."
      },
      {
        title: "Dashboard",
        description: "Created visual dashboards to communicate churn patterns and customer behavior insights for business decision-making."
      },
      {
        title: "Business Insight Analysis",
        description: "Evaluated key drivers of churn including geography (Germany highest risk), complaints, inactivity, and product usage patterns."
      }
    ]
  },
  {
    id: "3",
    title: "Stock Market Performance Analysis of Indonesia (2003–2024)",
    description:
      "Analyzed stock risk and return patterns in Indonesia Stock Exchange (BEI) during COVID-19 and post-COVID-19 using K-Means Clustering.",

    longDescription:
      "A data-driven financial analysis project that compares stock risk and return behavior in the Indonesia Stock Exchange (BEI) between the COVID-19 period and the post-COVID-19 recovery phase. The project applies feature engineering on OHLCV data to derive return, volatility, Sharpe Ratio, and liquidity indicators. K-Means Clustering is then used to group stocks into risk-return profiles (aggressive, defensive, and risky) to understand structural market shifts across economic periods. The analysis highlights how pandemic shocks reshaped investor behavior, sector performance, and portfolio risk distribution.",

    category: "Data",

    image: "/project/stock (1).png",

    images: [
      "/project/stock (1).png",
      "/project/stock (2).png"
    ],

    tags: [
      "Python",
      "K-Means Clustering",
      "Machine Learning",
      "Financial Analysis",
      "Stock Market",
      "Data Visualization",
      "OHLCV Data"
    ],

    datasetOverview: {
      source: "IDX Historical Stock Data",
      rows: "136,599",
      features: "7",
    },

    workflow: [
      {
        title: "Data Collection",
        description:
          "Collected historical stock data from 29 companies listed on the Indonesia Stock Exchange (BEI) covering OHLCV variables."
      },
      {
        title: "Data Understanding",
        description:
          "Explored dataset structure, identified variables, checked data types, and analyzed distribution of price and volume data across stocks."
      },
      {
        title: "Feature Engineering",
        description:
          "Constructed key financial indicators including average return, volatility, Sharpe Ratio, and average trading volume for each stock."
      },
      {
        title: "Period Segmentation",
        description:
          "Separated dataset into two analytical periods: COVID-19 (2020–2021) and post-COVID-19 (2022–2024) for comparative analysis."
      },
      {
        title: "K-Means Clustering",
        description:
          "Applied K-Means algorithm to group stocks into risk-return clusters and determined optimal cluster size using Elbow Method and Silhouette Score."
      },
      {
        title: "Comparative Analysis",
        description:
          "Compared cluster shifts across periods to identify structural changes in market behavior and sector performance."
      },
      {
        title: "Insight Generation",
        description:
          "Derived insights on risk-return redistribution, sector resilience, and investment behavior changes between crisis and recovery periods."
      }
    ]
  },
  {
    id: "4",
    title: "ExploreCirebon Web App",
    description: "A smart city tourism information system for exploring cultural, culinary, and tourism destinations in Cirebon.",

    longDescription:
      "ExploreCirebon is a web-based smart city tourism information system designed to help users discover tourism destinations in Cirebon, including cultural heritage sites, culinary spots, and local attractions. The system provides detailed destination information, user reviews, and a structured categorization of tourism places. It is built using Laravel for backend REST API development and ReactJS for the frontend interface. The platform also includes an admin dashboard for managing destination data and supporting content updates efficiently.",

    category: "Web Development",

    image: "/project/cireboners (1).png",

    images: [
      "/project/cireboners (1).png",
      "/project/cireboners (2).png",
      "/project/cireboners (3).png"
    ],

    tags: [
      "Laravel",
      "ReactJS",
      "MySQL",
      "REST API",
      "Web Development",
      "UI/UX"
    ],

    workflow: [
      {
        title: "Requirement Analysis",
        description: "Identified system needs for a tourism information platform including destination listing, categorization, user reviews, and admin management system."
      },
      {
        title: "System Design",
        description: "Designed system architecture using Laravel as backend REST API and ReactJS for frontend interface with separation of concerns between admin and user modules."
      },
      {
        title: "Backend Development",
        description: "Developed RESTful APIs using Laravel for managing destinations, categories (cultural, culinary, religious), user data, and reviews."
      },
      {
        title: "Frontend Development",
        description: "Built responsive user interface using ReactJS to display tourism information, search functionality, and destination detail pages."
      },
      {
        title: "Database Integration",
        description: "Integrated MySQL database to manage structured tourism data including destinations, users, reviews, and administrative records."
      },
      {
        title: "Testing & Deployment",
        description: "Performed functional testing for CRUD operations and deployed the system for demonstration and academic evaluation."
      }
    ]
  },
  {
    id: "5",
    title: "Jakarta Air Quality Analysis (AQI)",
    description: "Analyzed air quality trends in DKI Jakarta using AQI data from Bundaran HI Station (2019–2020).",

    longDescription:
      "An end-to-end data analytics project focused on evaluating air quality conditions in DKI Jakarta using Air Quality Index (AQI) data from Bundaran HI Station. The project involved data cleaning and wrangling in Orange Data Mining, SQL analysis in MySQL, exploratory data analysis using Python, and dashboard development in Tableau. The analysis compared air quality before and during the COVID-19 pandemic, revealing an increase in Good air quality days and a decrease in Unhealthy days during 2020.",

    category: "Data",

    image: "/project/aqi-dashboard1.png",

    images: [
      "/project/aqi-dashboard1.png",
    ],
    tags: [
      "Python",
      "MySQL",
      "Tableau",
      "Orange Data Mining",
      "Data Cleaning",
      "EDA",
      "Data Visualization"
    ],

    datasetOverview: {
      source: "Kaggle - Air Quality Index in Jakarta",
      rows: "5,173",
      features: "11",
    },

    workflow: [
      {
        title: "Data Collection",
        description: "Collected AQI data from Jakarta Open Data containing daily air quality measurements from Bundaran HI monitoring station."
      },
      {
        title: "Data Understanding",
        description: "Reviewed dataset structure, variable definitions, descriptive statistics, and identified missing values and data quality issues."
      },
      {
        title: "Data Cleaning & Wrangling",
        description: "Handled missing values, removed invalid categories, excluded PM25 due to excessive missing data, filtered records for 2019–2020, and encoded categorical attributes using Orange Data Mining."
      },
      {
        title: "SQL Analysis",
        description: "Imported the dataset into MySQL and executed aggregation queries to analyze air quality categories, pollutant averages, and yearly trends."
      },
      {
        title: "Exploratory Data Analysis",
        description: "Performed descriptive statistics, distribution analysis, category comparison, and correlation analysis using Python."
      },
      {
        title: "Dashboard & Insights",
        description: "Developed an interactive Tableau dashboard and identified improved air quality conditions during 2020, shown by an increase in Good-category days and a reduction in Unhealthy-category days."
      }
    ]
  },
];
