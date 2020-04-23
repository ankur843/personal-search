# Image Based Search Engine for Fruits
  A visual search engine to find information and trends on fruits
  
## Course Project for CSE 6242 at Georgia Tech

### Usage

**You can run it in two ways:-** 

- Online: [https://fruitsearch.onrender.com](https://fruitsearch.onrender.com)

- Offline: Test your changes locally by installing Docker and using the following command:
  Clone the source locally
    ```
    git clone https://github.com/ankur843/personal-search.git
    cd personal-search
    ```

    ```
    docker build -t cse6242 . && docker run --rm -it -p 5000:5000 cse6242
    ```


### For Developers :- 

**The project consists of 3 main components:**

1. Image Recognition
2. Document Clustering - code available under ```app/Map/Document Clusters``` and ```app/Map/Headlines```
3. Visualization - code available under ```app/Map```

