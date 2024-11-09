import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader,Comment } from "../components";
import { FaRegBookmark } from "react-icons/fa6";
import { useAddBookMark } from "../hooks/useAddBookMark";


function ItemPage() {
  const { id: productId, type: productType } = useParams(); // Get ID and type from the URL parameters
  const ItemPath = `http://localhost:8080/api/${productType}/${productId}`;

  const [loading, setLoading] = useState(false);
  const [itemData, setItemData] = useState(null); 
  const {AddBookMark,isLoading,error} = useAddBookMark()
  
  const handelSumbit = async(e)=>{
    e.preventDefault()
    await AddBookMark(productId,productType)
   }
  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await fetch(ItemPath, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        setItemData(result.data); // Set the item data
      } else {
        alert("Failed to fetch data");
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [productId, productType]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (!itemData) {
    return (
      <div className="text-center text-white">
        <p>No data available</p>
      </div>
    );
  }

  // Destructure common fields
  const {
    name,
    image,
    description,
    attack,
    defence,
    scalesWith,
    requiredAttributes,
    category,
    weight,
    effect,
    fpCost,
    hpCost,
    type,
    cost,
    slots,
    requires,
    affinity,
    skill,
    dmgNegation,
    resistance,
    effects,
    comment,
  } = itemData;

  return (
    <section className="max-w-7xl mx-auto pt-20">
      <div className="grid grid-cols-5   ">
        <div className="col-span-3 row-span-2 bg-black rounded-xl p-2">
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-extrabold text-yellow-600 text-[32px]">
              {name}
            </h1>
            <img
              className="mt-5 w-64 h-64 object-contain "
              src={image}
              alt={name}
            />
            <p className="mt-9 text-[#666e75] text-[18px] max-w-[800px]">
              {description}
            </p>
          </div> 
        </div>
          <div className="row-span-2 col-start-4 p-3">
            
            {/* Conditionally render based on the available data */}
            {attack && (
              <div className="mt-5">
                <h2 className="font-bold text-white text-[24px]">Attack</h2>
                <ul className="mt-2 text-[#ccc]">
                  {attack.map((atk) => (
                    <li key={atk._id}>
                      {atk.name}: {atk.amount}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {defence && (
              <div className="mt-5">
                <h2 className="font-bold text-white text-[24px]">Defence</h2>
                <ul className="mt-2 text-[#ccc]">
                  {defence.map((def) => (
                    <li key={def._id}>
                      {def.name}: {def.amount}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {scalesWith && (
              <div className="mt-5">
                <h2 className="font-bold text-white text-[24px]">
                  Scales With
                </h2>
                <ul className="mt-2 text-[#ccc]">
                  {scalesWith.map((scale) => (
                    <li key={scale._id}>
                      {scale.name}: {scale.scaling}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {requiredAttributes && (
              <div className="mt-5">
                <h2 className="font-bold text-white text-[24px]">
                  Required Attributes
                </h2>
                <ul className="mt-2 text-[#ccc]">
                  {requiredAttributes.map((attr) => (
                    <li key={attr._id}>
                      {attr.name}: {attr.amount}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {requires && (
              <div className="mt-5">
                <h2 className="font-bold text-white text-[24px]">
                  Required Attributes
                </h2>
                <ul className="mt-2 text-[#ccc]">
                  {requires.map((attr) => (
                    <li key={attr._id}>
                      {attr.name}: {attr.amount}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {dmgNegation && (
              <div className="mt-5">
                <h2 className="font-bold text-white text-[24px]">
                  DmgNegation
                </h2>
                <ul className="mt-2 text-[#ccc]">
                  {dmgNegation.map((attr) => (
                    <li key={attr._id}>
                      {attr.name}: {attr.amount}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {resistance && (
              <div className="mt-5">
                <h2 className="font-bold text-white text-[24px]">Resistance</h2>
                <ul className="mt-2 text-[#ccc]">
                  {resistance.map((attr) => (
                    <li key={attr._id}>
                      {attr.name}: {attr.amount}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="row-span-2 col-start-5 p-3">
            {category && weight && (
              <div className="mt-5">
                <h2 className="font-bold text-white text-[24px]">Details</h2>
                <p className="mt-2 text-[#ccc]">Category: {category}</p>
                <p className="mt-2 text-[#ccc]">Weight: {weight}</p>
              </div>
            )}

            {/* If the item has an effect (for talismans, for example), render it */}
            {effect && (
              <div className="mt-5">
                <h2 className="font-bold text-white text-[24px]">Effect</h2>
                <p className="mt-2 text-[#ccc]">{effect}</p>
              </div>
            )}
            {fpCost && (
              <div>
                <h2 className="font-bold text-white text-[24px]">FpCost</h2>
                <p className="mt-2 text-[#ccc]">{fpCost}</p>
              </div>
            )}
            {hpCost && (
              <div>
                <h2 className="font-bold text-white text-[24px]">HpCost</h2>
                <p className="mt-2 text-[#ccc]">{hpCost}</p>
              </div>
            )}
            {type && (
              <div>
                <h2 className="font-bold text-white text-[24px]">Type</h2>
                <p className="mt-2 text-[#ccc]">{type}</p>
              </div>
            )}
            {cost && (
              <div>
                <h2 className="font-bold text-white text-[24px]">Cost</h2>
                <p className="mt-2 text-[#ccc]">{cost}</p>
              </div>
            )}
            {slots && (
              <div>
                <h2 className="font-bold text-white text-[24px]">Slots</h2>
                <p className="mt-2 text-[#ccc]">{slots}</p>
              </div>
            )}
            {effects && (
              <div>
                <h2 className="font-bold text-white text-[24px]">Effects</h2>
                <p className="mt-2 text-[#ccc]">{effects}</p>
              </div>
            )}
            {affinity && (
              <div>
                <h2 className="font-bold text-white text-[24px]">Affinity</h2>
                <p className="mt-2 text-[#ccc]">{affinity}</p>
              </div>
            )}
          {skill && (
            <div>
              <h2 className="font-bold text-white text-[24px]">Skill</h2>
              <p className="mt-2 text-[#ccc]">{skill}</p>
            </div>
          )}
          {category && (
            <div>
              <h2 className="font-bold text-white text-[24px]">Category</h2>
              <p className="mt-2 text-[#ccc]">{category}</p>
            </div>
          )}
          </div>
        <div className="col-span-3 row-start-3 h-fit flex mt-4 ">
        {error && (<div className='text-yellow-700 font-bold text-xl text-start w-full'>{error}</div>)}
        <button disabled={isLoading} onClick={handelSumbit} className="flex justify-end w-full " >
          <FaRegBookmark size={30} color="yellow" cursor='pointer' className=" mr-[20px]" />
          </button>
        </div>
        <div className="col-span-5 row-start-4 my-7">
          <Comment Id={productId} Type={productType} comment={comment} />
        </div>
      </div>
    </section>
  );
}

export default ItemPage;
