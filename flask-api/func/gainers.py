import requests
import pandas as pd

def force_float(elt):
    
    try:
        return float(elt)
    except:
        return elt
    
def _convert_to_numeric(s):

    if "M" in s:
        s = s.strip("M")
        return force_float(s) * 1e6
    
    if "B" in s:
        s = s.strip("B")
        return force_float(s) * 1e9
    
    return force_float(s)

def get_top_gainers():
       
    html = requests.get("https://finance.yahoo.com/gainers?offset=0&count=10").text
    tables = pd.read_html(html)  
    df = tables[0].copy()
    df.columns = tables[0].columns
    del df["52 Week Range"]
    df["% Change"] = df["% Change"].map(lambda x: float(x.strip("%+").replace(",", "")))
    fields_to_change = [x for x in df.columns.tolist() if "Vol" in x \
                        or x == "Market Cap"]
    
    for field in fields_to_change:
        
        if type(df[field][0]) == str:
            df[field] = df[field].map(_convert_to_numeric)

    return df.to_json(orient='records')

def get_top_losers():
       
    html = requests.get("https://finance.yahoo.com/losers?offset=0&count=10").text
    tables = pd.read_html(html)  
    
    df = tables[0].copy()
    
    df.columns = tables[0].columns
    
    del df["52 Week Range"]
    
    df["% Change"] = df["% Change"].map(lambda x: float(x.strip("%+").replace(",", "")))
     

    fields_to_change = [x for x in df.columns.tolist() if "Vol" in x \
                        or x == "Market Cap"]
    
    for field in fields_to_change:
        
        if type(df[field][0]) == str:
            df[field] = df[field].map(_convert_to_numeric)

    return df.to_json(orient='records')