namespace dotnet;

public class TestData {

  public int Id { get; set; }

  public string Name { get; set; }

}

public class TestResult {

  public IEnumerable<TestData> Rows { get; set; }

  public string[] Data { get; set; }

}