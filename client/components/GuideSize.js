// Styled-css
import styled from "styled-components";

// TODO: Need to transform responsive and clean
export default function GuideSize() {
  return (
    <Table width="416" height="77">
      <tbody>
        <tr>
          <td style={{ width: 52 }}>CM</td>
          <td style={{ width: 53 }}>XS/6</td>
          <td style={{ width: 53 }}>S/8</td>
          <td style={{ width: 53 }}>M/10</td>
          <td style={{ width: 53 }}>L/12</td>
          <td style={{ width: 53 }}>XL/14</td>
          <td style={{ width: 53 }}>XXL/16</td>
        </tr>
        <tr>
          <td style={{ width: 52 }}>BUST</td>
          <td style={{ width: 53 }}>54</td>
          <td style={{ width: 53 }}>56</td>
          <td style={{ width: 53 }}>58</td>
          <td style={{ width: 53 }}>60</td>
          <td style={{ width: 53 }}>62</td>
          <td style={{ width: 53 }}>64</td>
        </tr>
        <tr>
          <td style={{ width: 52 }}>SHOULDER</td>
          <td style={{ width: 53 }}>38</td>
          <td style={{ width: 53 }}>40</td>
          <td style={{ width: 53 }}>42</td>
          <td style={{ width: 53 }}>44</td>
          <td style={{ width: 53 }}>46</td>
          <td style={{ width: 53 }}>48</td>
        </tr>
        <tr>
          <td style={{ width: 52 }}>LENGTH</td>
          <td style={{ width: 53 }}>55</td>
          <td style={{ width: 53 }}>57</td>
          <td style={{ width: 53 }}>59</td>
          <td style={{ width: 53 }}>61</td>
          <td style={{ width: 53 }}>63</td>
          <td style={{ width: 53 }}>65</td>
        </tr>
      </tbody>
    </Table>
  );
}

const Table = styled.table`
  font-size: 1.2rem;
`;
