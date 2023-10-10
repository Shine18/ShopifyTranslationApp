import React from 'react'
import { DataTable,Card, Text,Checkbox, IndexTable,Pagination, Page, Badge,Tag,HorizontalStack, VerticalStack,Button,ChoiceList } from "@shopify/polaris";
import styles from '~/styles/showproduct.css';
import {useState, useCallback} from 'react';
export const links = () => [{ rel: "stylesheet", href: styles }];
const showproduct=()=>{
    const [checked, setChecked] = useState(false);
    const handleChange = useCallback(
      (newChecked) => setChecked(newChecked),
      [],
    );
    return(
        <Page>
<div id="firstcheckbox">
<Checkbox
      label="Select All"
      checked={checked}
      onChange={handleChange}
    />
</div>
<div id="grid">
<Card>
  <div className="cardimageholder">
  <img className="cardimage" src="https://s3-alpha-sig.figma.com/img/9824/f33c/76647abb61891fe13da188ea01dbbb9d?Expires=1697414400&Signature=qjApYRx4npnAzwStxN4gThkhyqCjiaUQ00fNZ2FpGORRBbkxuqGcZoaRPRlNC2RVoeV0QLLLUeVgD03dLuWX2wS~j-UpSQF3HASGqa3LSV15xlRWtzu09EjWRa~fND1kv9nqO92DWgKf1IA5ZFw7pgGLX-zQBfqaf2AXeTjaaPWWEdTPGOLElJ55Y6vjguqjPgNLXixLtpEuS~qWW-gmfFJknImBAi651nHCBi2GWqbEnmWgc9baa3q-Kk1q5ebx-odqVEaDUgCQGWpKWa0qE~l5OpZ3Z4oJNZ6thCBr8qeGbF9ujpVM~xdMGbFz6jh7KCjjBNElXdbL-bYJov7AwA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4">
    </img>
  </div>
    <Text fontWeight="bold" variant="headingSm">Validate your product and the market</Text>
<Text>URL</Text>
<Text>www.atlrux.com</Text>
<div className="lastcardbutton">
    <Button>
        Select
    </Button>
<Text>View</Text>
</div>
</Card>
<Card>
  <div className="cardimageholder">
  <img className="cardimage" src="https://s3-alpha-sig.figma.com/img/9824/f33c/76647abb61891fe13da188ea01dbbb9d?Expires=1697414400&Signature=qjApYRx4npnAzwStxN4gThkhyqCjiaUQ00fNZ2FpGORRBbkxuqGcZoaRPRlNC2RVoeV0QLLLUeVgD03dLuWX2wS~j-UpSQF3HASGqa3LSV15xlRWtzu09EjWRa~fND1kv9nqO92DWgKf1IA5ZFw7pgGLX-zQBfqaf2AXeTjaaPWWEdTPGOLElJ55Y6vjguqjPgNLXixLtpEuS~qWW-gmfFJknImBAi651nHCBi2GWqbEnmWgc9baa3q-Kk1q5ebx-odqVEaDUgCQGWpKWa0qE~l5OpZ3Z4oJNZ6thCBr8qeGbF9ujpVM~xdMGbFz6jh7KCjjBNElXdbL-bYJov7AwA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4">
    </img>
  </div>
    <Text fontWeight="bold" variant="headingSm">Validate your product and the market</Text>
<Text>URL</Text>
<Text>www.atlrux.com</Text>
<div className="lastcardbutton">
    <Button>
        Select
    </Button>
<Text>View</Text>
</div>
</Card>
<Card>
  <div className="cardimageholder">
  <img className="cardimage" src="https://s3-alpha-sig.figma.com/img/9824/f33c/76647abb61891fe13da188ea01dbbb9d?Expires=1697414400&Signature=qjApYRx4npnAzwStxN4gThkhyqCjiaUQ00fNZ2FpGORRBbkxuqGcZoaRPRlNC2RVoeV0QLLLUeVgD03dLuWX2wS~j-UpSQF3HASGqa3LSV15xlRWtzu09EjWRa~fND1kv9nqO92DWgKf1IA5ZFw7pgGLX-zQBfqaf2AXeTjaaPWWEdTPGOLElJ55Y6vjguqjPgNLXixLtpEuS~qWW-gmfFJknImBAi651nHCBi2GWqbEnmWgc9baa3q-Kk1q5ebx-odqVEaDUgCQGWpKWa0qE~l5OpZ3Z4oJNZ6thCBr8qeGbF9ujpVM~xdMGbFz6jh7KCjjBNElXdbL-bYJov7AwA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4">
    </img>
  </div>
    <Text fontWeight="bold" variant="headingSm">Validate your product and the market</Text>
<Text>URL</Text>
<Text>www.atlrux.com</Text>
<div className="lastcardbutton">
    <Button>
        Select
    </Button>
<Text>View</Text>
</div>
</Card>
<Card>
  <div className="cardimageholder">
  <img className="cardimage" src="https://s3-alpha-sig.figma.com/img/9824/f33c/76647abb61891fe13da188ea01dbbb9d?Expires=1697414400&Signature=qjApYRx4npnAzwStxN4gThkhyqCjiaUQ00fNZ2FpGORRBbkxuqGcZoaRPRlNC2RVoeV0QLLLUeVgD03dLuWX2wS~j-UpSQF3HASGqa3LSV15xlRWtzu09EjWRa~fND1kv9nqO92DWgKf1IA5ZFw7pgGLX-zQBfqaf2AXeTjaaPWWEdTPGOLElJ55Y6vjguqjPgNLXixLtpEuS~qWW-gmfFJknImBAi651nHCBi2GWqbEnmWgc9baa3q-Kk1q5ebx-odqVEaDUgCQGWpKWa0qE~l5OpZ3Z4oJNZ6thCBr8qeGbF9ujpVM~xdMGbFz6jh7KCjjBNElXdbL-bYJov7AwA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4">
    </img>
  </div>
    <Text fontWeight="bold" variant="headingSm">Validate your product and the market</Text>
<Text>URL</Text>
<Text>www.atlrux.com</Text>
<div className="lastcardbutton">
    <Button>
        Select
    </Button>
<Text>View</Text>
</div>
</Card>
<Card>
  <div className="cardimageholder">
  <img className="cardimage" src="https://s3-alpha-sig.figma.com/img/9824/f33c/76647abb61891fe13da188ea01dbbb9d?Expires=1697414400&Signature=qjApYRx4npnAzwStxN4gThkhyqCjiaUQ00fNZ2FpGORRBbkxuqGcZoaRPRlNC2RVoeV0QLLLUeVgD03dLuWX2wS~j-UpSQF3HASGqa3LSV15xlRWtzu09EjWRa~fND1kv9nqO92DWgKf1IA5ZFw7pgGLX-zQBfqaf2AXeTjaaPWWEdTPGOLElJ55Y6vjguqjPgNLXixLtpEuS~qWW-gmfFJknImBAi651nHCBi2GWqbEnmWgc9baa3q-Kk1q5ebx-odqVEaDUgCQGWpKWa0qE~l5OpZ3Z4oJNZ6thCBr8qeGbF9ujpVM~xdMGbFz6jh7KCjjBNElXdbL-bYJov7AwA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4">
    </img>
  </div>
    <Text fontWeight="bold" variant="headingSm">Validate your product and the market</Text>
<Text>URL</Text>
<Text>www.atlrux.com</Text>
<div className="lastcardbutton">
    <Button>
        Select
    </Button>
<Text>View</Text>
</div>
</Card>
<Card>
  <div className="cardimageholder">
  <img className="cardimage" src="https://s3-alpha-sig.figma.com/img/9824/f33c/76647abb61891fe13da188ea01dbbb9d?Expires=1697414400&Signature=qjApYRx4npnAzwStxN4gThkhyqCjiaUQ00fNZ2FpGORRBbkxuqGcZoaRPRlNC2RVoeV0QLLLUeVgD03dLuWX2wS~j-UpSQF3HASGqa3LSV15xlRWtzu09EjWRa~fND1kv9nqO92DWgKf1IA5ZFw7pgGLX-zQBfqaf2AXeTjaaPWWEdTPGOLElJ55Y6vjguqjPgNLXixLtpEuS~qWW-gmfFJknImBAi651nHCBi2GWqbEnmWgc9baa3q-Kk1q5ebx-odqVEaDUgCQGWpKWa0qE~l5OpZ3Z4oJNZ6thCBr8qeGbF9ujpVM~xdMGbFz6jh7KCjjBNElXdbL-bYJov7AwA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4">
    </img>
  </div>
    <Text fontWeight="bold" variant="headingSm">Validate your product and the market</Text>
<Text>URL</Text>
<Text>www.atlrux.com</Text>
<div className="lastcardbutton">
    <Button>
        Select
    </Button>
<Text>View</Text>
</div>
</Card>
<Card>
  <div className="cardimageholder">
  <img className="cardimage" src="https://s3-alpha-sig.figma.com/img/9824/f33c/76647abb61891fe13da188ea01dbbb9d?Expires=1697414400&Signature=qjApYRx4npnAzwStxN4gThkhyqCjiaUQ00fNZ2FpGORRBbkxuqGcZoaRPRlNC2RVoeV0QLLLUeVgD03dLuWX2wS~j-UpSQF3HASGqa3LSV15xlRWtzu09EjWRa~fND1kv9nqO92DWgKf1IA5ZFw7pgGLX-zQBfqaf2AXeTjaaPWWEdTPGOLElJ55Y6vjguqjPgNLXixLtpEuS~qWW-gmfFJknImBAi651nHCBi2GWqbEnmWgc9baa3q-Kk1q5ebx-odqVEaDUgCQGWpKWa0qE~l5OpZ3Z4oJNZ6thCBr8qeGbF9ujpVM~xdMGbFz6jh7KCjjBNElXdbL-bYJov7AwA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4">
    </img>
  </div>
    <Text fontWeight="bold" variant="headingSm">Validate your product and the market</Text>
<Text>URL</Text>
<Text>www.atlrux.com</Text>
<div className="lastcardbutton">
    <Button>
        Select
    </Button>
<Text>View</Text>
</div>
</Card>
<Card>
  <div className="cardimageholder">
  <img className="cardimage" src="https://s3-alpha-sig.figma.com/img/9824/f33c/76647abb61891fe13da188ea01dbbb9d?Expires=1697414400&Signature=qjApYRx4npnAzwStxN4gThkhyqCjiaUQ00fNZ2FpGORRBbkxuqGcZoaRPRlNC2RVoeV0QLLLUeVgD03dLuWX2wS~j-UpSQF3HASGqa3LSV15xlRWtzu09EjWRa~fND1kv9nqO92DWgKf1IA5ZFw7pgGLX-zQBfqaf2AXeTjaaPWWEdTPGOLElJ55Y6vjguqjPgNLXixLtpEuS~qWW-gmfFJknImBAi651nHCBi2GWqbEnmWgc9baa3q-Kk1q5ebx-odqVEaDUgCQGWpKWa0qE~l5OpZ3Z4oJNZ6thCBr8qeGbF9ujpVM~xdMGbFz6jh7KCjjBNElXdbL-bYJov7AwA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4">
    </img>
  </div>
    <Text fontWeight="bold" variant="headingSm">Validate your product and the market</Text>
<Text>URL</Text>
<Text>www.atlrux.com</Text>
<div className="lastcardbutton">
    <Button>
        Select
    </Button>
<Text>View</Text>
</div>
</Card>
<Card>
  <div className="cardimageholder">
  <img className="cardimage" src="https://s3-alpha-sig.figma.com/img/9824/f33c/76647abb61891fe13da188ea01dbbb9d?Expires=1697414400&Signature=qjApYRx4npnAzwStxN4gThkhyqCjiaUQ00fNZ2FpGORRBbkxuqGcZoaRPRlNC2RVoeV0QLLLUeVgD03dLuWX2wS~j-UpSQF3HASGqa3LSV15xlRWtzu09EjWRa~fND1kv9nqO92DWgKf1IA5ZFw7pgGLX-zQBfqaf2AXeTjaaPWWEdTPGOLElJ55Y6vjguqjPgNLXixLtpEuS~qWW-gmfFJknImBAi651nHCBi2GWqbEnmWgc9baa3q-Kk1q5ebx-odqVEaDUgCQGWpKWa0qE~l5OpZ3Z4oJNZ6thCBr8qeGbF9ujpVM~xdMGbFz6jh7KCjjBNElXdbL-bYJov7AwA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4">
    </img>
  </div>
    <Text fontWeight="bold" variant="headingSm">Validate your product and the market</Text>
<Text>URL</Text>
<Text>www.atlrux.com</Text>
<div className="lastcardbutton">
    <Button>
        Select
    </Button>
<Text>View</Text>
</div>
</Card>
<Card>
  <div className="cardimageholder">
  <img className="cardimage" src="https://s3-alpha-sig.figma.com/img/9824/f33c/76647abb61891fe13da188ea01dbbb9d?Expires=1697414400&Signature=qjApYRx4npnAzwStxN4gThkhyqCjiaUQ00fNZ2FpGORRBbkxuqGcZoaRPRlNC2RVoeV0QLLLUeVgD03dLuWX2wS~j-UpSQF3HASGqa3LSV15xlRWtzu09EjWRa~fND1kv9nqO92DWgKf1IA5ZFw7pgGLX-zQBfqaf2AXeTjaaPWWEdTPGOLElJ55Y6vjguqjPgNLXixLtpEuS~qWW-gmfFJknImBAi651nHCBi2GWqbEnmWgc9baa3q-Kk1q5ebx-odqVEaDUgCQGWpKWa0qE~l5OpZ3Z4oJNZ6thCBr8qeGbF9ujpVM~xdMGbFz6jh7KCjjBNElXdbL-bYJov7AwA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4">
    </img>
  </div>
    <Text fontWeight="bold" variant="headingSm">Validate your product and the market</Text>
<Text>URL</Text>
<Text>www.atlrux.com</Text>
<div className="lastcardbutton">
    <Button>
        Select
    </Button>
<Text>View</Text>
</div>
</Card>
</div>
<div id="lastdiv">
<div id="anotherdiv">
<Pagination
      hasPrevious
      onPrevious={() => {
        console.log('Previous');
      }}
      hasNext
      onNext={() => {
        console.log('Next');
      }}
    />
    <Button primary>
     Next
    </Button>
</div>
</div>
        </Page>
    )
}
export default showproduct;