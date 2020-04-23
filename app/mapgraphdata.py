#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
import json


# In[13]:


def graph_ideas(source="apples"):
    df=pd.read_csv("app/fruits_ideas.csv")
    df_filtered=df[df['source']==source]
    df_filtered.reset_index(inplace=True)
    df_filtered.drop(columns='index',inplace=True)
    js=df_filtered.to_json(orient='index')
    a_json = json.loads(js)
    return a_json


# In[14]:


def map_data(source="apples"):
    df=pd.read_csv("app/fruits_data.csv")
    df_filtered=df[df['keyword']==source]
    df_filtered.reset_index(inplace=True)
    df_filtered.drop(columns='index',inplace=True)
    js=df_filtered.to_json(orient='index')
    a_json = json.loads(js)
    return a_json


# In[73]:


def cluster_data(source="apples"):
    df_cluster=pd.read_csv("app/document clusters/"+source+".csv")
    df_headline=pd.read_csv("app/headlines/"+source+".csv")
    df_headline['link2']=df_headline['link'].apply(lambda x: x[2:])
    df_headline['link3']=df_headline['link2'].apply(lambda x: x[:-1])
    df_headline['headline2']=df_headline['headline'].apply(lambda x: x[2:])
    df_headline['headline3']=df_headline['headline2'].apply(lambda x: x[:-1])
    df_headline.drop(columns=['link','link2','headline','headline2'],inplace=True)
    df_headline.rename(columns ={"link3":"link","headline3":"headline"},inplace=True)
    df_mergered=df_headline.merge(df_cluster,how='right',on='link')
    column_names = ["link", "headline", "cluster_no","content"]
    df_filtered = pd.DataFrame(columns = column_names)
    for cluster in df_mergered.cluster_no.unique():
        temp=[]
        temp=df_mergered[df_mergered['cluster_no']==cluster]
        temp=temp[0:3]
        df_filtered=df_filtered.append(temp,ignore_index=True)  
    df_filtered['unique']=len(df_mergered.cluster_no.unique())
    df_filtered['alltopics']=",".join(df_mergered.cluster_no.unique())
    js=df_filtered.to_json(orient='index')
    a_json = json.loads(js)
    return a_json


# In[ ]:




