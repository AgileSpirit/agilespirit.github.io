public class Midfielder implements Player extends Infielder {
  private final int number;

  public Midfielder(final int number) {
    super();
    this.number = number;
  }

  public void shoot() {
    // Does some awesome stuff !
    Logger.getLogger(Midfielder.class).info("Player shooted !");
  }
}