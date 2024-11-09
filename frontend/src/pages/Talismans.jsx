import React, { useEffect, useState } from "react";
import { Loader, FormField,Card } from "../components";
const RenderCards = ({ data, title }) => {
   if (data?.length > 0) {
     return data.map((post) => <Card key={post._id} {...post} />);
   }

   return (
     <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
   );
};
function Home() {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [allPosts, setAllPosts] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);
  
    const fetchData=async()=>{
      setLoading(true);

      try{
        const response = await fetch('http://localhost:8080/api/talismans', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const result = await response.json();
          setAllPosts(result.data.reverse());
        }
      }catch(error){
        alert(err);
      }finally{
        setLoading(false)
      }
    }
    useEffect(() => {
      fetchData();
    }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.category.toLowerCase().includes(searchText.toLowerCase()));
        setSearchedResults(searchResult);
      }, 500),
    );
  };

  return (
    <section className="max-w-7xl mx-auto pt-20">
      <div>
        <h1 className="font-extrabold text-yellow-600 text-[32px]">
          All the Talismans in Elden Ring
        </h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[700px]">
          Browse through a collection of imaginative and visually stunning
          talismans in Elden Ring
        </p>
      </div>
      <div className="mt-10">
        <FormField
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>
      <div>
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3 mt-3">
                Showing Resuls for{" "}
                <span className="text-yellow-700 font-bold">{searchText}</span>:
              </h2>
            )}
            <div className=" w-full  grid lg:grid-cols-6 sm:grid-cols-5 xs:grid-cols-4 grid-cols-3 gap-3 mt-10 pb-5">
              {searchText ? (
                <RenderCards
                   data={searchedResults}
                   title="No Search Results Found"
                />
              ) : (
                <RenderCards
                  data={allPosts} 
                 title="No Posts Yet" 
                 />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Home;
