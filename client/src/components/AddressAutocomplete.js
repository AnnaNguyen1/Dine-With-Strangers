import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";

export default function AddressAutocomplete({ setAddress2 }) {
  const [address, setAddress] = React.useState("");
  const handleSelect = async (value) => {};
  const searchOptions = {
    type: [address],
    componentRestrictions: { country: "au" },
  };
  const onError = (status, clearSuggestions) => {
    console.log("Google Maps API returned error with status: ", status);
    clearSuggestions();
  };

  setAddress2(address);

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onClick={handleSelect}
        searchOptions={searchOptions}
        onError={onError}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Type address..",
              })}
            />
            <div>
              {loading ? <div> ...loading </div> : null}

              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#96ceb4" : "#fff",
                };
                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}
